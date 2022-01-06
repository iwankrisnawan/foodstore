import * as React from 'react'; 
import { InputText, Button, FormControl, Card, LayoutOne} from 'upkit';
import { useForm } from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import { addProduct } from '../../api/product';
import TopBar from '../../components/TopBar';


export function AddProduct(){
	const history = useHistory();
	const { handleSubmit} = useForm();
	const [myData, setMyData] = React.useState({
		name:'',
		price:0,
    image:''
	}); 

	const handleChange = (name, value) => {
		setMyData({...myData, [name]:value});
	}
  
  const [image, setImage] = React.useState({preview:"", raw:""});
  
  const onChangeHandler = (e) => {
    if(e.target.files.length){
      // handleChange('image', e.target.files[0]);
      console.log(myData);
      console.log(e.target.files[0]);

      setMyData({...myData, 'image':e.target.files[0]});

      
      setImage({
        preview:URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });

    }
  }

	const onSubmit = async () => {
      console.log(myData);
      // console.log('asasas');
    	// let { data } = await addProduct(myData);

	    // if(data){
	    //   history.push('/');
	    // }
	}	


	return (
    <LayoutOne size="large" className="mt-5">
      <TopBar/>
      <br/>     
        <Card color="white">
          <div className="text-center mb-5 bold">
            Add Product
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <label htmlFor="">Nama:</label>
              <InputText
                fitContainer
                placeholder="masukkan nama"
                name="name"
                value={myData.name}
                onChange ={(e) => handleChange(e.target.name, e.target.value)}
              />
            </FormControl>

            <FormControl>
              <label htmlFor="">Harga:</label>
              <InputText
                fitContainer
                name="price"
                value={myData.price}
                onChange = {(e) => handleChange(e.target.name, e.target.value)}
              />
            </FormControl>

            <FormControl>
              <input type="file" name="image" value=""
              onChange={onChangeHandler}/>
            </FormControl>
            <label htmlFor ="upload-button">
              {image.preview ? (
                <img src={image.preview} alt="dummy" width="300" height ="300"/>
              ):(
                <>
                  <span className="fa-stack fa-2x mt-3 mb-2">
                    <i className="fas fa-circle fa-stack-2x"/>
                    <i className = "fas fa-store fa-stack-1x fa-inverse"/>
                  </span>
                  <h5 className="text-left">Upload your photo</h5>
                </>
              )}
            </label>
            <br/>


            <Button fitContainer size="large">
             submit
            </Button>

          </form>
        </Card>
    </LayoutOne>
  );
}