
const Dashboard = () => {
  return (
    <div>
        <nav>
            <div className="text-center text-3xl p-5 font-medium">Admin Page</div>
        </nav>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10 gap-4">
            <a className="p-5 border-1 border-gray-400 rounded-md shadow-md text-center" href="/admin010/admin999">Dashboard</a>
            <a className="p-5 border-1 border-gray-400 rounded-md shadow-md text-center" href="/admin010/admin999/orderList">Order List</a>
            <a className="p-5 border-1 border-gray-400 rounded-md shadow-md text-center" href="/admin010/admin999/productList">Product List</a>
            <a className="p-5 border-1 border-gray-400 rounded-md shadow-md text-center" href="/admin010/admin999/userList">User List</a>
            <a className="p-5 border-1 border-gray-400 rounded-md shadow-md text-center" href="/admin010/admin999/createProduct">Create Product</a> 
        </div>
    </div>
  )
}

export default Dashboard