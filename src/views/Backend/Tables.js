import {  Badge,  Card,  CardHeader,  CardFooter,  DropdownMenu,  DropdownItem,  UncontrolledDropdown,  DropdownToggle,  Media,  Pagination,  PaginationItem,
  Button,  NavItem,  PaginationLink,  Progress,  Table,  Container,  Nav,  Row,  UncontrolledTooltip} from "reactstrap";
import { differenceInYears } from 'date-fns';
import { faMale, faFemale } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from "react-router-dom";
import classnames from "classnames";
import { chartOptions, parseOptions, chartExample1, chartExample2 } from "variables/charts.js";
import Chart from "chart.js";

// core components
import Header from "components/Headers/Header.js";
import { getUsers, deleteUser } from "../../services/apiUser.js";
import { useEffect, useState } from 'react';
import axios from 'axios';

import DemoNavbar from "components/Navbars/DemoNavbar";


const Tables = () => {
  const [sideNavWidth, setSideNavWidth] = useState(0);

  function openNav() {
    setSideNavWidth(250);
  }

  function closeNav() {
    setSideNavWidth(0);
  }
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // const res = getUsers()
    //   .then(res => {
    //     console.log(res.data);
    //     setUsers(res.data.users);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    getAllUser();
    const interval = setInterval(() => {
      getAllUser(); // appel répété toutes les 10 secondes
    }, 10000);
    return () => clearInterval(interval); // nettoyage à la fin du cycle de vie du composant
  
  }, []);

  const getAllUser=async()=>{
    const res = await getUsers()
      .then(res => {
        console.log(res.data);
        setUsers(res.data.users);
      })
      .catch(err => {
        console.log(err);
      });
  }
  const deleteAUser = async (user) => {
    const result = window.confirm("Are you sure you want to delete "+user.username+"?");
    if (result) {
      //console.log(user);
      await axios.delete(`http://localhost:5000/users/${user._id}`);

            getAllUser();
    }
  }
  
  const Modifier = async (user) => {
    const result = window.confirm("Are you sure you want to modify "+user.username+"?");
    if (result) {
      //console.log(user);
      navigate(`/profile/${user._id}`);

    }
  }
  const genderIcon = (gender) => {
    if (gender === 'Male') {
      return <FontAwesomeIcon icon={faMale} size="3x" color="#007bff" />;
    } else if (gender === 'Female') {
      return <FontAwesomeIcon icon={faFemale} size="3x" color="#f54291" />;
    } else {
      return null;
    }
  };


  function calculateCompletionPercentage(user) {
    let percentage = 100;
    
    if (!user.first_Name) {
      percentage -= 30;
    }
    
    if (!user.last_Name) {
      percentage -= 20;
    }
    
    if (!user.phoneNumber) {
      percentage -=15;
    }   
    if (!user.address) {
      percentage -=10;
    }
    console.log(percentage);
    return percentage;
  }
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  return (
    <>
    
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
      <span
          style={{ fontSize: '30px', cursor: 'pointer' }}
          onClick={openNav}
        >
          &#9776; open
        </span>
        <div>
          <div id="mySidenav" className="sidenav" style={{ width: sideNavWidth }}>
            <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
              &times;
            </a>
            <a 
            className={classnames("py-2 px-3", {
              active: activeNav === 1
            })}
            onClick={(e) => navigate(`/Tables`)}>Users</a>
            <a 
            className={classnames("py-2 px-3", {
              active: activeNav === 1
            })}
            onClick={(e) => navigate(`/`)}>Project</a>
            <a 
            className={classnames("py-2 px-3", {
              active: activeNav === 1
            })}
            onClick={(e) => navigate(`/Index`)}>All</a>
          </div>
        </div>
        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Card tables</h3>
              </CardHeader>
              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <NavItem className="d-none d-lg-block ml-lg-4">
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      href=""
                      onClick={(e) => navigate(`/Profile-Add`)}
                      target="_blank"
                    >
                      <span className="nav-link-inner--text ml-1">
                        Create a new account
                      </span>
                    </Button>
                  </NavItem>
                </Nav>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">User Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Age</th>
                    <th scope="col">gender</th>
                    <th scope="col">First Name- Last Name</th>
                    <th scope="col">address</th>
                    <th scope="col">AccountCompletionPercentage</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (



                    <tr key={user._id}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-2 "
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={`http://localhost:5000/images/${user.image_user}`}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                            {user.username}

                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>
                        {user.email}

                      </td><td>

                        {differenceInYears(new Date(), new Date(user.dateOfBirth))}

                      </td>
                      <td>
                        <span className="gender-logo">

                          {genderIcon(user.gender)}


                        </span>
                      </td>

                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                          {user.first_Name} - {user.last_Name} 
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          {user.address } 
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">
                          {calculateCompletionPercentage(user)} %</span>
                          <div>
                            <Progress
                              max="100"
                              value={calculateCompletionPercentage(user)}
                              barClassName="bg-warning"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href=""
                              onClick={(e) => deleteAUser(user)}

                            >
                              Supprimer
                            </DropdownItem>
                            <DropdownItem
                              href=""
                              onClick={(e) => Modifier(user)}
                            >
                              Modifier
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
