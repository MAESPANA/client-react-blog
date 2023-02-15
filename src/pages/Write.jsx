
import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const Write = () => {

  const state = useLocation().state
  const [value, setValue] = useState(state?.title ||  '');
  const [title, settitle] = useState(state?.desc || '');
  const [file, setfile] = useState(null);
  const [cat, setcat] = useState(state?.cat || '');
  const navigate = useNavigate()

  
  const upload = async ()=>{
    try {
      const formData = new FormData();
      formData.append("file",file)
      const res = await axios.post("/upload", formData)
      return res.data;
    } catch (err) {
      console.log(err)
    }
  
  }
  
  const handleSubmnit = async e =>{
  
    e.preventDefault()
    const imgUrl = await upload();
    try {
      state 
      ? await axios.put(`/posts/${state.id}`, {
        title,desc:value,cat, 
        img:file ? imgUrl : ""

      }) 
      :await axios.post(`/posts/`, {
        title,desc:value,cat, 
        img:file ? imgUrl : "",
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        

      })
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }
  return (
  <div className="add">
    <div className="content">
      <input type="text" value={title} placeholder='Titulo' onChange={e => settitle(e.target.value)} />
      <div className="editorContainer">
      <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
      </div>
    </div>
    <div className="menu">
      <div className="item">
      <h1>Publicar</h1>
      <span>
        <b>Estatus:</b> Borrador
      </span>

      <span>
        <b>Visible:</b> Publicar
      </span>

      <input className='file' style={{display:'none'}} type="file" id='file' onChange={e => setfile(e.target.files[0])} />
      <label  htmlFor="file">Subir Imagen</label>
      <br />
      <div className="button">
        <button>Guardar Borrador</button>
        <button onClick={handleSubmnit}>Publicar</button>
      </div>
      </div>
      <div className="item">
        <h1>Categoria</h1>
        <div className='cat'>
        <input type="radio" checked={cat=== "art"} name='cat' value='art' id='art' onChange={e => setcat(e.target.value)}/>
        <label htmlFor="art">Arte</label>

        </div>
        <div className='cat'>
        <input type="radio" checked={cat=== "science"} name='cat' value='science' id='science' onChange={e => setcat(e.target.value)}/>
        <label htmlFor="science">Ciencia</label>
        </div>
        <div className='cat'>
        <input type="radio" checked={cat=== "cinema"} name='cat' value='cinema' id='cinema' onChange={e => setcat(e.target.value)}/>
        <label htmlFor="cinema">Cine</label>
        </div>
        <div className='cat'>
        <input type="radio" checked={cat=== "design"} name='design' value='design' id='design' onChange={e => setcat(e.target.value)}/>
        <label htmlFor="design">Diseno</label>
        </div>
        <div className='cat'>
        <input type="radio" checked={cat=== "food"} name='food' value='food' id='food' onChange={e => setcat(e.target.value)}/>
        <label htmlFor="food">Comida</label>
        </div>
      

      </div>
    </div>
  </div>
  )
}

export default Write