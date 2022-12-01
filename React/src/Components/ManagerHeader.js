import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import "../css/header2.css";
import logo from "../semobanlogo_3.png";
import { AiFillBell } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

function Header2() {
  const [isClicked, setIsClicked] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  function setLoginState() {
    if (!!sessionStorage.getItem("accessToken")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }

  useEffect(() => {
    console.log(sessionStorage.getItem("accessToken"));
    setIsClicked(false);
    setLoginState();
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg mt-3" variant="light">
      <Container className="nav-cont">
        <Link to="/">
          <img src={logo} href="/main" className="logo_header"></img>
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav>
              <NavDropdown
                title="게시판"
                className="nav_dropdown"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="/board/free">
                  자유 게시판
                </NavDropdown.Item>
                <NavDropdown.Item href="/board/info">
                  정보공유 게시판
                </NavDropdown.Item>
                <NavDropdown.Item href="/board/questions">
                  질문 게시판
                </NavDropdown.Item>
                <NavDropdown.Item href="/board/mypet">
                  자랑 게시판
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title="뉴스"
                className="nav_dropdown"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="/news/video">
                  영상 뉴스
                </NavDropdown.Item>
                <NavDropdown.Item href="/news/article">
                  기사 뉴스
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="나의 활동" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/mypage/post">
                  작성한 게시글 조회
                </NavDropdown.Item>
                <NavDropdown.Item href="/mypage/comment">
                  작성한 댓글 조회
                </NavDropdown.Item>
                <NavDropdown.Item href="/mypage/likedpost">
                  좋아요 한 게시글 조회
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Nav className="nav-icon">
              <Nav.Link>
                <AiFillBell size={24}></AiFillBell>
              </Nav.Link>
              {isLogin && (
                <Nav.Link>
                  <div className="icon member dropdown">
                    <BsFillPersonFill
                      size={24}
                      onClick={(e) => setIsClicked(!isClicked)}
                    ></BsFillPersonFill>
                    <Dropdown visibility={isClicked}>
                      <ul className="boardmenu icon_content">
                        {/* 관리자용 기능들(로그아웃, 회원관리, 변수값 조정)*/}
                        <li className="li_menu">
                          <Link to="/managerlogin" className="link_menu">
                            로그아웃
                          </Link>
                        </li>
                        <li className="li_menu">
                          <Link to="/memberlist" className="link_menu">
                            회원 관리
                          </Link>
                        </li>
                        <li className="li_menu">
                          <Link to="/variablecontrol" className="link_menu">
                            변수값 조정
                          </Link>
                        </li>
                      </ul>
                    </Dropdown>
                  </div>
                </Nav.Link>
              )}
              {/* 관리자 헤더에서 로그인 하는 경우는 없을 듯? */}
              {/* {!isLogin && (
                <div className="no_login">
                  <div>
                    <Link to="/login">로그인</Link>
                  </div>
                </div>
              )} */}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header2;