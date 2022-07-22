import {useState, useEffect} from 'react'
import {db} from './firebase-config'
import {  collection, getDocs, addDoc,
  updateDoc, deleteDoc, doc, orderBy, serverTimestamp, query, onSnapshot} from 'firebase/firestore'
import './App.css'
import {Stack, Button, Form, Col, Row, Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom' 
import Card from './Card'

const App = () => {
  const [newName, setNewName] = useState("")
  const [newAge, setNewAge] = useState(null)
  const [users, setUsers] = useState([])
  const [sort, setSort] = useState(false) 
  const usersCollectionRef = collection(db, "users")
  
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    console.log('deleted')
  }
  const increaseAge = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);  
  }
  const createUser = async () => {
    if (newName.trim().length > 0)
    {
      const newUser = {name: newName, age: newAge,
        timestamp: serverTimestamp()}; 
      await addDoc(usersCollectionRef, newUser);
      setNewName('')
      setNewAge('')
    }
  }
  useEffect(() => {
    const q = query(usersCollectionRef, orderBy("timestamp", "desc"))
    // const getUsers = async () => {  
    //   const data = await getDocs(usersCollectionRef)
    //   console.log(data)
    //   return setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    // }
    // getUsers()
    const data = onSnapshot(q, (snapshot) => 
      setUsers(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))))
    
    //   users.map((user) => {
    //   console.log(`name: ${user.name}\tage: ${user.age}`)
    // })
    return data; 
  }, [])
  //data.trim().length > 0 return false; 
  return (
    <>
    <Navbar bg="dark" variant="dark" 
      sticky="top" expand="lg">
      <Navbar.Brand>
        <h2 className='d-flex align-items-center'>
          <a href="https://youtu.be/dQw4w9WgXcQ"><img className='logoimg' src='https://media.newyorker.com/photos/59095bb86552fa0be682d9d0/master/pass/Monkey-Selfie.jpg'/></a>
        {''} Basic CRUD Application</h2>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
      <Nav className='m-3'>
        <NavDropdown title="Products">
          <NavDropdown.Item href="https://www.maihoney.com">Honey</NavDropdown.Item>
          <NavDropdown.Item href="products/tea">Tea</NavDropdown.Item>
          <NavDropdown.Divider></NavDropdown.Divider>
          <NavDropdown.Item href="products/promo">Promo</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="about">About</Nav.Link>
        <Nav.Link href="contact">Contact</Nav.Link>
        <Nav.Link href="support">Support</Nav.Link>
      </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Stack className='m-4'>
      <h1 className='mb-3'>Enter Data Below</h1>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="name" required>
          <Form.Label column sm="2">
            <h3>Name</h3>
          </Form.Label>
          <Col sm="10">
            <Form.Control type="" 
              required
              onChange={(e) => {setNewName(e.target.value)}}
              placeholder="Enter Name"
              onKeyPress={event => {
                if (event.key === "Enter") {
                  createUser()
                }
              }}
              value={newName}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="age">
          <Form.Label column sm="2">
            <h3>Age</h3>
          </Form.Label>
          <Col sm="10">
            <Form.Control 
              onChange={(e) => {setNewAge(e.target.value)}}
              placeholder="Enter Age"
              type="number"
              required
              value={newAge}
              min={0}
              max={120}
              step={1}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  createUser()
                }
              }}/>
          </Col>
        </Form.Group>
        <div className="containerman mb-3 d-flex justify-content-start">
          <Button className='b1' onClick={createUser}>Submit</Button>
        </div>
      </Form>
      {users.map((user) => {
        return (
          <Card name={user.name} age={user.age} id={user.id}
            deleteUser={deleteUser} increaseAge={increaseAge}></Card>
        )
      })}
      <footer className='mt-4'>
        Built with Bootstrap & Cloud Firestore
      </footer>
    </Stack>  
  </>
  )
}


export default App;