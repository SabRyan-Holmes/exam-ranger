import { MdAdminPanelSettings } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { FaNotesMedical } from "react-icons/fa6";
import { MdSwitchAccount } from "react-icons/md";
import { Link } from "@inertiajs/react";

const AdminDrawer = () => {
  return (
    <div className="drawer-side shadow-2xl">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu p-4 w-64 min-h-full bg-secondary text-base-content">
        {/* Sidebar content here */}
        <div className="flex justify-center"><MdAdminPanelSettings className="min-h-16 min-w-28" /></div>
        <li className="font-bold mt-4"><Link href="/dashboard"><MdSpaceDashboard />Dashboard</Link></li>
        <li className="font-bold"><Link href="/dashboard/soal-ujian"><FaNotesMedical />Soal</Link></li>
        <li className="font-bold"><Link href="/dashboard/peserta"><MdSwitchAccount />Peserta</Link></li>

      </ul>

    </div>
  )
}

export default AdminDrawer