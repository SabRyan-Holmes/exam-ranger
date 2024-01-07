import { MdAdminPanelSettings } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { FaNotesMedical } from "react-icons/fa6";
import { MdSwitchAccount } from "react-icons/md";
import { Link } from "@inertiajs/react";
import logo from "../../assets/logo_sementara.png"
import ApplicationLogo from "./ApplicationLogo";
import NavLinkDashboard from "./NavbarLinkDashboard";

const AdminDrawer = ({ active = false }) => {
  console.log(`isi active dari drawer ${active}`)
  return (
    <div className="drawer-side  shadow-2xl">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu p-4 w-64 min-h-full bg-slate-700 text-slate-100 ">

        {/* Sidebar content here */}
        <div className="flex justify-center"><img src={logo} className=" text-primary/70 w-28 h-28" /></div>

        {/* <ApplicationLogo className="mx-16 " /> */}
        <div className="border-b-2 border-yellow-600 mt-4 mb-2" />

        {/* <li href={route('dashboard')} active={route().current('dashboard')} className={`font-bold hover:text-yellow-600 active:text-primary mt-4` + (active && 'text-primary')}><Link href={route('dashboard')}>Dashboard</Link></li> */}
        <NavLinkDashboard href={route('dashboard')} active={route().current('dashboard')}><MdSpaceDashboard />
          Dashboard
        </NavLinkDashboard>

        <NavLinkDashboard href={route('admin.soal-tipe')} active={route().current('admin.soal-tipe')}><FaNotesMedical />
          Soal
        </NavLinkDashboard>



        <NavLinkDashboard href={route('admin.peserta')} active={route().current('admin.peserta')}><MdSwitchAccount />
          Peserta
        </NavLinkDashboard>

      </ul>

    </div>
  )
}

export default AdminDrawer