import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Radio, RadioGroup, Spinner } from "@nextui-org/react";
import { BsArrowLeft } from "react-icons/bs";
import { dev_url } from "../utils/axios";


const SingleOrder = () =>
{
  const [ order, setOrder ] = useState({});
  const { id } = useParams()
  const [ loading, setLoading ] = useState( true );
  const axiosPrivate = useAxiosPrivate();
  const [isLoading,setIsLoading] = useState(false)

  const onChange = ( e ) =>
  {
    const { name, value } = e.target
    setOrder( { ...order, [name]: value } )
  }

  useEffect( () =>
  {
    if ( order.id && order.status ) {
      ( async () =>
    {
      setIsLoading(true)
      try {
        axiosPrivate.patch( `/order/status?id=${ id }&status=${ order.status }` );
      } catch ( error ) {
        console.log( error );
      } finally { 
        setIsLoading(false)
      }
    })()
    }
  },[id,order,axiosPrivate])
  
  const navigate = useNavigate()
  
  useEffect( () =>
  {
    ( async() =>
    {
      // fetch order by id
      setLoading( true )
      try {
        const res = await axiosPrivate.get( `/order/${ id }` );
        //console.log(res.data.data.order)
        setOrder( res.data.data.order );
      } catch ( error ) {
        console.error( error );
      } finally { 
        setLoading( false )
      }
    })()
  }, [ id, axiosPrivate ] )


  return (
    <div className="w-full h-full overflow-y-auto">
      { loading && !order.id && <div className="h-full flex items-center justify-center">
        <Spinner/>
      </div> }
      { !loading && order.id && (
        <div className="p-4 w-full h-full overflow-y-auto">
          <div className="flex items-center space-x-4">
            <BsArrowLeft onClick={ () => navigate( -1 ) } role="button" />
            <p className="font-extrabold text-xl capitalize text-primary">Order Details</p>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between">
              {/* Order Informations */ }
              <div>
                <p className="font-bold text-lg capitalize">Order Informations</p>
                <div>
                  <p className="font-semibold">Order Id: <span className="text-tiny font-normal"> { order.id }</span></p>
                  <p className="font-semibold">Order Date: <span className="text-tiny font-normal"> { new Date(order.createdAt).toDateString() }</span></p>
                  <p className="font-semibold">Order Status: <span className="text-tiny font-normal"> { order.status }</span></p>
                  <p className="font-semibold">Net Amount: <span className="text-tiny font-normal"> { order.netAmount }</span></p>
                  <p className="font-semibold">Delivery Address: <span className="text-tiny font-normal"> { order.address }</span></p>
                </div>
              </div>
              {/* Customer Informations */ }
              <div>
                <p className="font-bold text-lg capitalize">Customer Informations</p>
                <div>
                  <p className="font-semibold">Name: <span className="text-tiny font-normal"> { order.user.name }</span></p>
                  <p className="font-semibold">Email: <span className="text-tiny font-normal"> { order.user.email }</span></p>
                  <p className="font-semibold">Phone Number: <span className="text-tiny font-normal"> { order.user.phone_number }</span></p>
                  <p className="font-semibold">Address: <span className="text-tiny font-normal"> { order.user.address.location }, { order.user.address.city }, { order.user.address.state }, { order.user.address.country }</span></p>
                </div>
              </div>
            </div>
            {/* Product Information */ }
            <div className="mt-4">
              <p className="font-bold text-lg capitalize">Product Informations</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                { order.products.map( item => (
                  <div key={ item.id } className="border p-4 rounded-lg">
                    <div className="flex justify-between">
                      <div className="flex space-x-2 items-center">
                        <img src={`${dev_url.replace("/merchant","")}/${item.product.dp.replace("public/","")}`} alt={ item.product.name } className="w-10 h-10 object-contain" />
                        <p className="font-bold">{ item.product.name }</p>
                      </div>
                      <p className="font-bold">&#8358;{ item.price }</p>
                    </div>
                    <div>
                      <p>Quantity: { item.quantity }{ item.product.unit}</p>
                      <div className="flex space-x-2 items-center">
                        { item.variation !== null && (
                          <div className="flex space-x-2 items-center">
                            <p>Variant:</p>
                            { item.variation.type === "size" || item.variation.type ===  "others" ? (
                              <p className="uppercase">{ item.variation.variant }</p>
                            ) : (
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.variation.variant }}/>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    { item.supplementryProducts.length > 0 && (
                      <div className="mt-4">
                        <p className="font-bold text-small capitalize">Supplementary Product Informations</p>
                        <div className="grid grid-cols-1 gap-4">
                          { item.supplementryProducts.map( sup => (
                            <div key={ sup.id } className="border p-4 rounded-lg">
                              <div className="flex justify-between">
                                <div className="flex space-x-2 items-center">
                                  <p className="font-bold">{ sup.name }</p>
                                </div>
                                <p className="font-bold">&#8358;{ sup.price }</p>
                              </div>
                              <div>
                                <p>Quantity: { sup.quantity }</p>
                              </div>
                            </div>
                          ) ) }
                          </div>
                      </div>
                    )}
                  </div>
                ) ) }
              </div>
            </div>
            {/* Supplementry Product */ }

            
            

            
            {/* Status Change */ }
            <div className="mt-4">
              <p className="font-bold text-lg capitalize">Change Order Status</p>
              <RadioGroup name="status" value={ order.status } orientation="horizontal" onChange={ ( e ) => onChange(e) }>
                <Radio isDisabled={isLoading || order.status === "PENDING" } value="PENDING">Pending</Radio>
                <Radio isDisabled={isLoading || order.status === "ACCEPTED" } value="PAID">Paid</Radio>
                <Radio isDisabled={ isLoading || order.status === "DELIVERED" } value="DELIVERED">Delivered</Radio>
                <Radio isDisabled={isLoading || order.status === "OUT_FOR_DELIVERY" } value="OUT_FOR_DELIVERY">Delivery in progress</Radio>
                <Radio isDisabled={isLoading || order.status === "CANCELLED" } value="CANCELLED">Cancelled</Radio>
              </RadioGroup>
            </div>
            
          </div>
        </div>
      ) }
      {!loading && !order.id && <p>Order not found</p>}
    </div>
  )
}

export default SingleOrder