import { useNavigate } from 'react-router-dom';

function Header({ isAdmin }: { isAdmin?: boolean }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    localStorage.removeItem('master-token');
    localStorage.removeItem('room');
    localStorage.removeItem('type');
    localStorage.removeItem('message');
    navigate('/');
  };

  if (isAdmin) {
    return (
      <div className='flex justify-between mb-4 px-10 py-4 bg-violet-200'>
        <h1>Admin</h1>
        <div className='flex'>
          <p
            className='mr-4 cursor-pointer'
            onClick={() => navigate('/create-user')}
          >
            Create User
          </p>
          <p
            className='mr-4 cursor-pointer'
            onClick={() => navigate('/profile')}
          >
            Profile
          </p>
          <p className='cursor-pointer' onClick={handleLogout}>
            Logout
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex justify-between mb-4 px-10 py-4 bg-violet-200'>
      <h1>User</h1>
      <div className='flex'>
        <p className='mr-4 cursor-pointer' onClick={() => navigate('/rooms')}>
          Room
        </p>
        <p className='cursor-pointer' onClick={handleLogout}>
          Logout
        </p>
      </div>
    </div>
  );
}

export default Header;
