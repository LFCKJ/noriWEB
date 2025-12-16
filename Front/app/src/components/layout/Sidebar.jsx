import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import './Sidebar.css';

/**
 * Sidebar - 통합 사이드바
 *
 * 공간 전환과 메뉴를 하나의 사이드바에 통합한 컴포넌트입니다.
 * 상단에 공간 전환 버튼, 하단에 메뉴가 표시됩니다.
 *
 * @param {Object} props - 컴포넌트 props
 * @param {Array} props.personalMenus - 개인 공간 메뉴 목록
 * @param {Array} props.workspaceMenus - 워크스페이스 메뉴 목록
 * @param {Array} props.spaceMenus - 스페이스 메뉴 목록
 * @param {string} props.className - 추가 CSS 클래스
 */
const Sidebar = ({
  personalMenus = [],
  workspaceMenus = [],
  spaceMenus = [],
  tempMenus = [],
  className = ''
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 어느 공간에 있는지 확인
  const isPersonal = location.pathname.startsWith('/personal');
  const isSpaces = location.pathname.startsWith('/spaces');
  const isWorkspace = location.pathname.startsWith('/workspace/');
  const isTemp = location.pathname.startsWith('/temp');

  return (
    <aside className={`sidebar ${className}`}>
      {/* 공간 전환 버튼 */}
      <div className="sidebar__space-switcher">
        <Button
          variant="icon"
          size="icon"
          active={isPersonal}
          onClick={() => navigate('/personal')}
          title="개인 공간"
          aria-label="개인 공간으로 이동">
          👤
        </Button>

        <Button
          variant="icon"
          size="icon"
          active={isWorkspace || isSpaces}
          onClick={() => navigate('/spaces')}
          title="워크스페이스"
          aria-label="워크스페이스 선택으로 이동">
          {isWorkspace ? '⬅️' : '🏢'}
        </Button>
      </div>

      {/* <div className="sidebar__divider" /> */}

      {/* 메뉴 영역 */}
      <div className="sidebar__menu">
        {/* 개인 공간 메뉴 */}
        {isPersonal && (
          <nav className="sidebar__nav">
            {personalMenus.map(menu => (
              <Button
                key={menu.id}
                variant="icon"
                size="icon"
                active={location.pathname === menu.path}
                onClick={() => navigate(menu.path)}
                title={menu.name}>
                {menu.icon}
              </Button>
            ))}
          </nav>
        )}

        {/* 워크스페이스 메뉴 */}
        {isWorkspace && workspaceMenus.length > 0 && (
          <nav className="sidebar__nav">
            {workspaceMenus.map(menu => (
              <Button
                key={menu.id}
                variant="icon"
                size="icon"
                active={location.pathname === menu.path}
                onClick={() => navigate(menu.path)}
                title={menu.name}>
                {menu.icon}
              </Button>
            ))}
          </nav>
        )}

        {/* 워크스페이스 선택 화면 */}
        {isSpaces && (
          <nav className="sidebar__nav">
            {spaceMenus.map(menu => (
              <Button
                key={menu.id}
                variant="icon"
                size="icon"
                active={location.pathname === menu.path}
                onClick={() => navigate(menu.path)}
                title={menu.name}>
                {menu.icon}
              </Button>
            ))}
          </nav>
        )}

        {/* 임시 메뉴 영역 */}
        {isTemp && (
          <nav className="sidebar__nav">
            {tempMenus.map(menu => (
              <Button
                key={menu.id}
                variant="icon"
                size="icon"
                active={location.pathname === menu.path}
                onClick={() => navigate(menu.path)}
                title={menu.name}>
                {menu.icon}
              </Button>
            ))}
          </nav>
        )}
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  personalMenus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired
    })
  ),
  workspaceMenus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired
    })
  ),
  spaceMenus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired
    })
  ),
  className: PropTypes.string
};

export default Sidebar;
