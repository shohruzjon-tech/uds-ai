export default function ConfigPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">System Configuration</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">App Versions</h2>
            
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Android Client</h3>
                <p className="text-gray-600">Version: 1.0.0</p>
                <button className="mt-2 text-primary-600 hover:text-primary-700">Update Version</button>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">iOS Client</h3>
                <p className="text-gray-600">Version: 1.0.0</p>
                <button className="mt-2 text-primary-600 hover:text-primary-700">Update Version</button>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Android Driver</h3>
                <p className="text-gray-600">Version: 1.0.0</p>
                <button className="mt-2 text-primary-600 hover:text-primary-700">Update Version</button>
              </div>

              <div>
                <h3 className="font-medium mb-2">iOS Driver</h3>
                <p className="text-gray-600">Version: 1.0.0</p>
                <button className="mt-2 text-primary-600 hover:text-primary-700">Update Version</button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Pricing Configuration</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Base Price (UZS)</label>
                <input type="number" className="w-full border rounded px-4 py-2" defaultValue="5000" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price per KM (UZS)</label>
                <input type="number" className="w-full border rounded px-4 py-2" defaultValue="2000" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price per Minute (UZS)</label>
                <input type="number" className="w-full border rounded px-4 py-2" defaultValue="500" />
              </div>

              <button className="w-full bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700">
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
