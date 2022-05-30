import React, { useState,useEffect} from "react";
import styles from "./AddProduct.module.css"
import axios from "axios"

const AddProduct = () => {
  // TODO: Remove below const and instead import them from chakra
  // const Button = () => <div />;
  // const Modal = () => <div />;
  // const ModalBody = () => <div />;
  // const Input = () => <div />;
  // const Select = () => <div />;
  // const RadioGroup = () => <div />;
  // const Radio = () => <div />;
  const [value,setValue] = useState(false)
 const [prod,setProd] = useState([]);
 const [limit,setLimit] = useState(3)
 const [page, setPage] = useState(1)
 const [form,setForm] = useState({});

     useEffect(()=> {
       const getData =  async () => {
        let res = await axios.get(`https://17ff65.sse.codesandbox.io/products?_page=${page}&_limit=${limit}`)
        console.log(res.data)
        setProd(res.data)
      }
       getData()

     },[limit])


     const handleOnChange = (e)=> {
       let {name, type, value, Radio} = e.target;
       if(type === "Radio")
       {
         setForm({
           ...form,
           [name]:Radio
         })
       }
       else{
         setForm({
           ...form,
           [name]:value,
         })
       }
     }

     const handleOnSubmit = (e)=> {
       e.preventDefault();
       console.log(form)
     }
    

 


  return (
    <> 
      {/* <Button my={4} data-cy="add-product-button"></Button>
      <Modal>
        <ModalBody pb={6}>
          <Input data-cy="add-product-title" />
          <Select data-cy="add-product-category">
            <option data-cy="add-product-category-shirt"></option>
            <option data-cy="add-product-category-pant"></option>
            <option data-cy="add-product-category-jeans"></option>
          </Select>
          <RadioGroup data-cy="add-product-gender">
            <Radio data-cy="add-product-gender-male"></Radio>
            <Radio data-cy="add-product-gender-female"></Radio>
            <Radio data-cy="add-product-gender-unisex"></Radio>
          </RadioGroup>
          <Input data-cy="add-product-price" />
          <Button data-cy="add-product-submit-button"></Button>
        </ModalBody>
      </Modal> */}

      <div className={styles.header}>
             <button onClick={()=> setValue(!value)}>Add Product</button>
            {!value?  <form onSubmit={handleOnSubmit} >

<div className={styles.form}>
  <h3>Add New Products</h3>
  <h5>Title</h5>
  <input type="text"
  placeholder="Title"
  name="title"
  value={form.title}
  onChange={handleOnChange}
  />

  <h5>Category</h5>
  <select name="category" value={form.category} onChange={handleOnChange} >
      <option value="Category">Category</option>
      <option value="Shirt">Shirt</option>
      <option value="Pant">Pant</option>
      <option value="jeans">jeans</option>

  </select>

  <h5>Gender</h5>
  <input type="radio"
  name="gender"
  value="male"
  onChange={handleOnChange}
  /> <label>Male</label>
  <input type="radio"
  name="gender"
  value="female"
  onChange={handleOnChange}/> <label>female</label>
  <input type="radio"
  name="gender"
  value="Unisex"
  onChange={handleOnChange}/> <label>Unisex</label> <br/> <br/>
  <input type="text"
  placeholder="Add Image"
  name="img"
  value={form.img}
  onChange={handleOnChange}
  />

  <h5>Price</h5>
  <input type="text"
  placeholder="Price"
  name="price"
  value={form.price}
  onChange={handleOnChange}
  />
</div>
<input type="submit" value="Create"/>
</form> : null
}
            
            <div><button
            onClick={()=> setPage(1)}
          >First</button>
            <button
              disabled={page<=1}
              onClick={()=> {
                if(page<=1)
                {
                  setPage(page-1)
                }
              }}
            >Previous</button>
         <select onChange={(e)=> setLimit(Number(e.target.value))}>
           <option value="3">3</option>
           <option value="6">6</option>
           <option value="9">9</option>

         </select>
         <button onClick={()=> setPage((page)=> page+1)} >Next</button>
         <button>Last</button>

            </div>
      </div>

      <div className={styles.container} >
        {prod.map((p)=> (
          <div classsName={styles.products} >
            <img  src={p.imageSrc} alt=""/>
            <p  classsNam={styles.p} >{p.price}₹</p>
            <p classsNam={styles.p} >{p.category}</p>
            <p classsNam={styles.p} >{p.gender}</p>
            <p classsNam={styles.p} >{p.title}</p>
          </div>
        ))}
      </div>


      <div className={styles.formProd}>
          <img src={form.img} alt=""/>
          <p>{form.title}</p>
          <p>{form.category}</p>
          <p>{form.price}</p>

      </div>

    </>
  );
};

export default AddProduct;