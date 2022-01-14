import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import EditProfile from './EditProfile';
import logo from '../logo.svg';
const View = () => {

//post logic
const[description,setDescription] =React.useState('');
const[title,setTitle] = React.useState('');
const[price,setPrice] = React.useState('');
const[photo,setPhoto]= React.useState('');


const handlePrice = (e)=>{
setPrice(e.target.value);
}
const handlePostTitle = (e) =>{

setTitle(e.target.value);
}

  const handleDescription =(e)=>{
    setDescription(e.target.value);
  };
const data= {
  title: title,
  price: price,
  description: description,
  photo: photo,
  };

  const handlePhoto=(e)=>{
   // setPhoto(e.target.files[0]);
   let photoFile=e.target.files[0];
    console.log(e.target.files);
    let reader = new FileReader();
    reader.readAsDataURL(photoFile);
    reader.onload=(e)=>{
      console.log(e.target.result);
      setPhoto(e.target.result);
    }
  }  

const handlePost = () => {
  const json = JSON.stringify(data)
    axios.post('api/createListing', json)
   // .then(document.write(json));
.then((response) =>{
console.log(response);
})
}



  //View listings
  const[counter, setCounter] = React.useState('');
  var [listing, setListing] = React.useState([]);
 

  
 


  const count = () =>{
    axios.get('/api/countListings').then((response) =>{
     setCounter(response.data);
    })
  }


  const all =  () => {
   axios.get('api/viewListings')
 
  .then((res)=>{
console.log(res.data); 
setListing(res.data);
    })


   };


React.useEffect(() => {
 all();
count();


},[])

//empty json for some reason

const removeListing = (data)=>{
  const obj = JSON.stringify(data);
  console.log(obj);
  axios.post('api/removeListing', obj)
.then((res)=>{
  console.log(res);
  window.location.reload();
})
}

const editListing = (data)=>{
  const json = JSON.stringify(data);
  axios.post('api/editListing'.json)
  .then((res)=>{
    console.log(res);
    window.location.reload();
  })
}


 

  return (
 <div>
<div>
      <h1>Post</h1>
      <form>
      <label>Title </label>
      <input value = {title} onChange={handlePostTitle}/>
      <br/>
      <label>Price </label>
      <input value = {price} onChange={handlePrice}/>
      <br/>
      <label>Description </label>
      <input value = {description} onChange={handleDescription}/>
      <br/>
      <input type="file" name ="file"
          accept="image/jpg,image/jpeg,image/png"
          onChange={handlePhoto}
          />
     
      <button onClick={handlePost}>Submit Listing</button>
      <br/>
      </form>
    </div>



      <br/>
  <h1> There are {counter} Listings Displayed!</h1>
    <div className="post">
      <br/>
    {listing.map((data,key)=>{

      return (
        <div key={key}>
          
         <h1>Title: {data.title}</h1>
          <br/>
         <label>Price: {data.price}</label>
         <br/>
         <label>Description: {data.description}</label>
          <br/>
          <img src={data.photo} height={100}/>
          
         
         <br/>
          <br/>
      <Link to={{pathname:"/EditProfile",
    state:data}}><button>Edit</button></Link>
          <button type="submit" onClick={()=>removeListing(data)}>remove</button>
        </div>
       
        
      )
     
    })}
   
    </div>
    </div>
  );


   
  
  
};

export default View;
/*

axios.get('/api/viewListings')
.then((res)=>{
console.log(res);
 };
*/