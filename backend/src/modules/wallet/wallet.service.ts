import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet, Transaction } from './wallet.schema';
import { TransactionType } from '../../common/enums';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<Wallet>,
    @InjectModel(Transaction.name)
    private transactionModel: Model<Transaction>,
  ) {}

  async getWallet(userId: string): Promise<Wallet> {
    let wallet = await this.walletModel.findOne({ userId }).exec();
    if (!wallet) {
      wallet = await this.walletModel.create({ userId });
    }
    return wallet;
  }

  async getBalance(userId: string): Promise<number> {
    const wallet = await this.getWallet(userId);
    return wallet.balance;
  }

  async addTransaction(
    walletId: string,
    type: TransactionType,
    amount: number,
    description?: string,
  ): Promise<Transaction> {
    const wallet = await this.walletModel.findById(walletId).exec();
    const newBalance = wallet.balance + amount;
    wallet.balance = newBalance;
    await wallet.save();

    return this.transactionModel.create({
      walletId,
      type,
      amount,
      description,
      balanceAfter: newBalance,
    });
  }

  async getTransactions(userId: string): Promise<Transaction[]> {
    const wallet = await this.getWallet(userId);
    return this.transactionModel.find({ walletId: wallet._id }).sort({ createdAt: -1 }).exec();
  }
}
