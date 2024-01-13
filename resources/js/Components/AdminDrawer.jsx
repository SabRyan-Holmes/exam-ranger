import { MdAdminPanelSettings } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { FaNotesMedical } from "react-icons/fa6";
import { MdSwitchAccount } from "react-icons/md";
import { Link } from "@inertiajs/react";
import logo from "../../assets/logo.png"
import ApplicationLogo from "./ApplicationLogo";
import NavLinkDashboard from "./NavbarLinkDashboard";
import { CiViewTimeline } from "react-icons/ci";
import { GrOverview } from "react-icons/gr";

const AdminDrawer = ({ active = false }) => {
  console.log(`isi active dari drawer ${active}`)
  return (
    <div className="drawer-side  shadow-2xl">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu p-4 w-64 min-h-full bg-gradient-to-b text-opacity-75 from-slate-950 to bg-orange-950  text-slate-100 ">

        {/* Sidebar content here */}
        <div className="flex justify-center"><img src={logo} className=" text-primary/70 w-24 h-24 m-3" />
        </div>

        {/* <ApplicationLogo className="mx-16 " /> */}
        <div className="border-b-2 border-yellow-600 mt-4 mb-2" />


        <NavLinkDashboard href={route('admin.dashboard')} active={route().current('admin.dashboard')}><MdSpaceDashboard />
          Dashboard
        </NavLinkDashboard>

        <NavLinkDashboard href={route('admin.soal-tipe')} active={route().current('admin.soal-tipe')}><FaNotesMedical />
          Soal
        </NavLinkDashboard>



        <NavLinkDashboard href={route('admin.peserta')} active={route().current('admin.peserta')}><MdSwitchAccount />
          Peserta
        </NavLinkDashboard>

        <NavLinkDashboard href={route('admin.overview')} active={route().current('admin.overview')}><GrOverview />
          Overview
        </NavLinkDashboard>

      </ul>

    </div>
  )
}

export default AdminDrawer