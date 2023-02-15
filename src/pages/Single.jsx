import React, { useContext, useEffect, useState } from "react";
import Edit from '../img/edit.png'
import Delete from'../img/delete.png'
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Menu from "../component/Menu";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2"


const Single = () => {

  //usar el contexto para extraer el usuario
  const {currentUser} = useContext(AuthContext)

  const[post, setstatePost] = useState({})
  const location = useLocation()
  const navigate = useNavigate()
  const postId = location.pathname.split("/")[2]


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setstatePost(res.data);
        
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  },[postId])

  const handleDelete = async ()=>{
    try {

      Swal.fire({
        title: 'Estas seguro?',
        text: "Que deseas eliminar este post!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then( async (result) => {
        if (result.isConfirmed) {

          await axios.delete(`/posts/${postId}`)        
          Swal.fire(
           
            'Deleted!',
            'Tu has eliminadoo tu Post.',
            "success",
            navigate("/")

          )
          
        }
      })

       
   
      
    } catch (err) {
      console.log(err);
    }
  }

  return (

    
    <div className="single">
      
      <div className="content">
        <img
          src={`../upload/${post?.img}` }
          alt=""
        />
        <div className="user">
          <img
            src={post?.userImg}
            alt=""
          />
          <div className="info">
            <span>{post.username}</span>
            <p>creaado {moment( post.date).fromNow()}</p>
          </div>
          {currentUser.username  ? (
          <div className="edit">
            <Link to={`/write?edit=2`} state={post} > 
            <img src={Edit} alt="" />
            </Link>
        
          <img onClick={handleDelete} src={Delete} alt="" />
          
        </div>):
        (
          <div className="edit">
            {/* <Link to={`/write?edit=2`} state={post} > 
            <img src={Edit} alt="" />
            </Link>
        
          <img onClick={handleDelete} src={Delete} alt="" />
           */}
        </div>)
        }
        </div>

       <h1>{post.title}</h1>
            {post.desc}
      </div>
      <div className="menu">
      <Menu cat={post.cat}/>
      </div>
    </div>
  
  

  );

          
};

export default Single;
