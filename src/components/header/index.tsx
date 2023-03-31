import { useNavigate } from 'react-router-dom';

function Header({ isAdmin, socket }: { isAdmin?: boolean; socket?: any }) {
  const navigate = useNavigate();

  const clearData = () => {
    const roomName = JSON.parse(localStorage.getItem('room') || '{}');
    if (!isAdmin) {
      socket.emit('leave-room', roomName, () => {
        socket.disconnect();
      });
    }
    localStorage.removeItem('room');
    localStorage.removeItem('type');
    localStorage.removeItem('message');
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    clearData();
    navigate('/');
  };

  if (isAdmin) {
    return (
      <div className='flex justify-between mb-4 px-10 py-4 bg-violet-200'>
        <h1 className='cursor-pointer' onClick={() => navigate('/admin')}>
          Admin
        </h1>
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
        <p
          className='mr-4 cursor-pointer'
          onClick={() => {
            clearData();
            navigate('/rooms');
          }}
        >
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
