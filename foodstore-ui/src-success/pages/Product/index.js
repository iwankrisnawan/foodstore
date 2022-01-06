import * as React from 'react'; 
import { InputText, Button, FormControl, Card, LayoutOne} from 'upkit';
import { useForm } from 'react-hook-form';
import {useHistory, Link, useRouteMatch} from 'react-router-dom';
import { config } from '../../config';
import axios from 'axios';
import { getProduct, editProduct } from '../../api/product';
import TopBar from '../../components/TopBar';
// import StoreLogo from '../../components/StoreLogo';
// import {userLogin} from '../../features/Auth/actions';
// import {rules} from './validation';


export function EditProduct(){
  const history = useHistory();
  const { register, handleSubmit, errors, setError } = useForm();
  const [productId, setProductId] = React.useState(`${useRouteMatch().params.id}`);
  const [myData, setMyData] = React.useState({});

  // const dataProduct = async () => {
  //     try {
  //       await Axios.get(`http://localhost:3000/api/products/${productId}`)
  //       .then(response => {
  //         setMyData(response.data[0]);
  //       });
  //     } catch(error) {
  //       console.log(error);
  //     }
  // }
  const dataProduct = async () => {
      let {data} = await getProduct(productId);
      setMyData({
        _id: data[0]._id,
        name: data[0].name,
        price:data[0].price,
        image:{}
      });
  }

  React.useEffect(() => {
    dataProduct()
  }, [productId]);

  const handleChange = (name, value) => {
    setMyData({...myData, [name]:value});
    console.log(myData);
  }

  const onSubmit = async () => {
    let { data } = await editProduct(myData);

    if(data){
      history.push('/');
    }
  }


  return (
    <LayoutOne size="large" className="mt-5">
      <TopBar/>
      <br/>     
        <Card color="white">
          <div className="text-center mb-5 bold">
            Edit Product
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <label htmlFor="">Nama:</label>
              <InputText
                fitContainer
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
              onChange={(e) => handleChange(e.target.name, e.target.files[0])}/>
            </FormControl>

            <Button fitContainer size="large">
             submit
            </Button>

          </form>
        </Card>
    </LayoutOne>
  );
}