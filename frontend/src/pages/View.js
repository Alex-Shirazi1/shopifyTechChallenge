import React from 'react';
import axios from 'axios';
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

const editListing = ()=>{
  const json1 = JSON.stringify(oldData);
  const json2 = JSON.stringify(dataToBeEdited);
  const json3= json1+json2;

  axios.post('api/editListing',json3)
  .then((res)=>{
    console.log(res);
  window.location.reload();
  })
}

var[descriptionEdit,setDescriptionEdit] =React.useState('');
var[titleEdit,setTitleEdit] = React.useState('');
var[priceEdit,setPriceEdit] = React.useState('');
var[photoEdit,setPhotoEdit]= React.useState('');


const handlePriceEdit = (e)=>{
setPriceEdit(e.target.value);
}
const handlePostTitleEdit = (e) =>{

setTitleEdit(e.target.value);

}

  const handleDescriptionEdit =(e)=>{
    setDescriptionEdit(e.target.value);
  };

  const handlePhotoEdit=(e)=>{
    setPhotoEdit(e.target.files[0]);
   let photoFile=e.target.files[0];
    console.log(e.target.files);
    let reader = new FileReader();
    reader.readAsDataURL(photoFile);
    reader.onload=(e)=>{
      console.log(e.target.result);
      setPhotoEdit(e.target.result);
    }
  }  

const dataToBeEdited = {
  title: titleEdit,
  price: priceEdit,
  description: descriptionEdit,
  photo: photoEdit,
};

var[descriptionEdit1,setDescriptionEdit1] =React.useState('');
var[titleEdit1,setTitleEdit1] = React.useState('');
var[priceEdit1,setPriceEdit1] = React.useState('');
var[photoEdit1,setPhotoEdit1]= React.useState('');

 

const oldData = {
  title: titleEdit1,
  price: priceEdit1,
  description: descriptionEdit1,
  photo: photoEdit1,
};





const editMode=(data)=>{
setTitleEdit(data.title);
setPriceEdit(data.price);
setDescriptionEdit(data.description);
setPhotoEdit(data.photo);

setTitleEdit1(data.title);
setPriceEdit1(data.price);
setDescriptionEdit1(data.description);
setPhotoEdit1(data.photo);

console.log(data.photo);
console.log(titleEdit);
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

<h1>Edit Form</h1>
<form>
      <label>Title </label>
      <input defaultValue={titleEdit} onChange={handlePostTitleEdit}/>
      <br/>
      <label>Price </label>
      <input defaultValue={priceEdit} onChange={handlePriceEdit}/>
      <br/>
      <label>Description </label>
      <input defaultValue = {descriptionEdit} onChange={handleDescriptionEdit}/>
      <br/>
      <img src={photoEdit} height={100}/>
      <br/>
      <input defaultValue={photoEdit} type="file" name ="file"
          accept="image/jpg,image/jpeg,image/png"
          onChange={handlePhotoEdit}
          />
      <button onClick={editListing}>Submit Listing</button>
      <br/>
      </form>

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
         <button type="submit" onClick={()=>editMode(data)}>edit</button>
          <button type="submit" onClick={()=>removeListing(data)}>remove</button>
        </div>
       
      
      )
     
    })}
   
    </div>
    </div>
  );


   
  
  
};

export default View;
