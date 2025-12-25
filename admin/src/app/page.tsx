import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">UDS GO Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Users" value="0" />
          <StatCard title="Active Rides" value="0" />
          <StatCard title="Total Deliveries" value="0" />
          <StatCard title="Revenue" value="0 UZS" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/users" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-2">Users Management</h2>
            <p className="text-gray-600">Manage clients, drivers, and admins</p>
          </Link>

          <Link href="/rides" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-2">Rides Management</h2>
            <p className="text-gray-600">Monitor and manage taxi rides</p>
          </Link>

          <Link href="/deliveries" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-2">Deliveries Management</h2>
            <p className="text-gray-600">Monitor and manage deliveries</p>
          </Link>

          <Link href="/config" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-2">Configuration</h2>
            <p className="text-gray-600">System settings and app versions</p>
          </Link>
        </div>
      </div>
    </main>
  )
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold text-primary-600">{value}</p>
    </div>
  )
}
