import React from 'react';
import axios from 'axios';

const View = () => {

//post logic
const[description,setDescription] =React.useState('');
const[title,setTitle] = React.useState('');
const[price,setPrice] = React.useState('');
const[email,setEmail] = React.useState('');

const handleEmail = (e)=>{
  setEmail(e.target.value);
}

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
  email:email,
  title: title,
  price: price,
  description: description,
  
    
  };
const handlePost = () => {
  const json = JSON.stringify(data)
    axios.post('localhost:9000/api/createListing', json)
   // .then(document.write(json));
.then((response) =>{
alert(response.data);

})
}



  //View listings
const [titleDelete, setTitleDelete] = React.useState('');
  const[counter, setCounter] = React.useState('');
  var [listing, setListing] = React.useState([]);
 

  
  const handleTitle = (e) => {
    setTitleDelete(e.target.value);
  }



  const count = () =>{
    axios.get('localhost:9000/api/countListings').then((response) =>{
     setCounter(response.data);
    })
  }


  const all =  () => {
   axios.get('localhost:9000/api/viewListings')
 
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



const deletePost = () => {
const title = titleDelete;

axios.post('/api/deleteListing', title)
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
      <label>Email </label>
      <input value = {email} onChange={handleEmail}/>
      <br/>
      <label>Title </label>
      <input value = {title} onChange={handlePostTitle}/>
      <br/>
      <label>Price </label>
      <input value = {price} onChange={handlePrice}/>
      <br/>
      <label>Description </label>
      <input value = {description} onChange={handleDescription}/>
      <br/>
     
      <button onClick={handlePost}>Submit Listing</button>
      <br/>
      </form>
    </div>



      <br/>
  <h1> There are {counter} Posts Displayed!</h1>
    <div className="post">
      <br/>
    {listing.map((data,key)=>{

      return (
        <div key={key}>
          
         <h1>Title: {data.title}</h1>
          <br/>
          <label>email: {data.email}</label>
         <br/>
         <label>Price: {data.price}</label>
         <br/>
         <label>Description: {data.description}</label>
          <br/>
          <label></label>
          <br/>
          
        </div>
       
        
      )
     
    })}
    <label>Delete by Title<input value = {titleDelete} onChange ={handleTitle} type="text"/></label>
    <br/>
    <button onClick={deletePost} >Delete!</button>

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