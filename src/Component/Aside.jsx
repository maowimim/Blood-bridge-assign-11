// Aside.jsx
import { Home, Users, Settings, LogOut } from "lucide-react";
import { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../provider/AuthProvider";


const Aside = () => {
  
  const { role ,logout} = use(AuthContext)
   const handleLogout=()=>{
        logout()
         .then(res=>console.log(res))
    }

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col overflow-hidden">

      {/* Top Section */}
      <div className="p-5">
       <Link to='/'> <h1 className="text-2xl font-bold mb-10">AdminPanel</h1></Link>
      </div>

      {/* Navigation (scrolls if long) */}
      <nav className="flex-1 px-5 space-y-3 overflow-y-auto">
        <NavLink
          to="/dashboard/maindashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition
            ${isActive ? "bg-blue-600 text-white" : "hover:bg-slate-700"}`
          }
        >
          <Home className="h-5 w-5" />
          Dashboard
        </NavLink>

        {
          role == 'donor' && (<NavLink
            to="/dashboard/add-request"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition
            ${isActive ? "bg-blue-600 text-white" : "hover:bg-slate-700"}`
            }
          >
            <Home className="h-5 w-5" />
            Add Request
          </NavLink>)
        }

        {
          role == 'admin' && (
            <NavLink
          to="/dashboard/all-users"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition
            ${isActive ? "bg-blue-600 text-white" : "hover:bg-slate-700"}`
          }
        >
          <Home className="h-5 w-5" />
          All Users
        </NavLink>
          )
        }

        <NavLink
          to="/dashboard/my-request"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition
            ${isActive ? "bg-blue-600 text-white" : "hover:bg-slate-700"}`
          }
        >
          <Home className="h-5 w-5" />
          My Request
        </NavLink>

        <NavLink
          to="/dashboard/addVolunteer"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition
            ${isActive ? "bg-blue-600 text-white" : "hover:bg-slate-700"}`
          }
        >
          <Home className="h-5 w-5" />
          Add Volunteer
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition
            ${isActive ? "bg-blue-600 text-white" : "hover:bg-slate-700"}`
          }
        >
          <Users className="h-5 w-5" />
          Users
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition
            ${isActive ? "bg-blue-600 text-white" : "hover:bg-slate-700"}`
          }
        >
          <Settings className="h-5 w-5" />
          Settings
        </NavLink>
      </nav>

      {/* Logout (always bottom, never moves) */}
      <div className="p-5 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>

    </aside>
  );
};

export default Aside;
