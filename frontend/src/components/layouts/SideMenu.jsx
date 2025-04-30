import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import   CharAvatar from './CharAvatar';

const SideMenu = ({ activeMenu }) => {
  const { user, clearuser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === '/logout') {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearuser();
    navigate('/login');
  };

  return (
    <div className="w-64 h-[95vh] bg-white border-r border-gray-200/50 p-5 sticky top-[60px ] z-20 -mt-5 lg:-ml-4 sm:-ml-8 ">
      <div className="flex flex-col justify-center gap-3 mb-6">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-20 h-20 bg-slate-400 rounded-full mb-2 pl-2"
          />
        ) : <CharAvatar
        fullName={user?.fullName}
        width="w-20"
        height="h-20"
        style="text-xl z-[999]"
      />}
        <h5 className="text-lg font-semibold">{user?.fullName || ''}</h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
    <button
      key={`menu_${index}`}
      onClick={() => handleClick(item.path)}  // Changed from item.route to item.path
      className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 
        ${activeMenu === item.label ? 'text-white bg-primary' : 'text-gray-700 hover:bg-gray-100'}`}
    >
      <item.icon className="text-xl" />
      {item.label}
    </button>
  ))}
</div>
  );
};

export default SideMenu;
