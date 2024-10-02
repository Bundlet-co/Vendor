import { Input, Select, SelectSection,SelectItem, Textarea, DatePicker, Button, Image, Accordion ,AccordionItem} from "@nextui-org/react";
import { FaPencil } from "react-icons/fa6";
import thumb from "../Assets/img/thumb.png"
import { BsPlus } from "react-icons/bs";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {getLocalTimeZone, today} from "@internationalized/date";
import useMainContext from "../hooks/useMainContext";
import Complementry from "../components/products/Complementry";
import Variation from "../components/products/Variation";

const AddProduct = () =>
{
  const axiosPrivate = useAxiosPrivate();
  const { openToast, closeToast } = useMainContext();
  const [ images, setImages ] = useState( [] );
  const [ img1, setImg1 ] = useState( thumb );
  const [ img2, setImg2 ] = useState( thumb );
  const [ img3, setImg3 ] = useState( thumb );
  const [ img4, setImg4 ] = useState( thumb );
  const [ img5, setImg5 ] = useState( thumb );
  const [ hero, setHero ] = useState( thumb );
  const [ dp, setDp ] = useState( thumb );
  const [ slug, setSlug ] = useState( "" )
  const [ date, setDate ] = useState( today(getLocalTimeZone()) );
  const [ loading, setLoading ] = useState( false )
  const [ categories, setCategories ] = useState( [] );
  const [ dispatch_location, setDispatch_location ] = useState( [] );
  const [ complementryData, setComplemetryData ] = useState( [] );
  const [variation,setVariation] = useState([])



  const [ formData, setFormData ] = useState( {
    name: "",
    category: "",
    slug: [],
    description: "",
    price: "",
    quantity: "",
    discount_type: "",
    discount_amount: "",
    available_till: "",
    delivery_duration: "",
    dispatch_location: "",
    unit: "",
    product_type:""
  } )

  const handleChange = ( e,setState ) =>
  {
    const { name, value } = e.target;
    if ( name !== "slug" && Array.isArray( formData[ name ] )) { 
      setFormData( ( prev ) => ( {
        ...prev,[name]:[...formData[name],value]
      }))
    } else 
    if (name === "slug" && Array.isArray( formData[ name ] ) ) {
      if ( /[ ,]$/.test( value ) ) {
        const newWord = value.split( /[ ,]+/ ).map( word => word.trim() ).filter( word => word );
        const updatedWord = [ ...new Set( [ ...formData.slug, ...newWord ] ) ];
        setFormData( ( prev ) => ( {
          ...prev, [ name ]: updatedWord
        } ) ) 
        setState('')
      } else {
        setState(value)
      }
    } else {
      setFormData( ( prev ) => ( {
        ...prev, [name]:value
      }))
    }

  };

  const handleKeyDown = ( e ) =>
  {
    if ( e.key === 'Backspace' && slug === "" && formData.slug.length > 0 ) {
      const lastWord = formData.slug[ formData.slug.length - 1 ];
      setSlug( lastWord );
      setFormData( prev => (
        {
          ...prev, slug:formData.slug.slice(0, -1)
        }
      ))
    }
  }


  const handleFileChange = ( e,setState ) =>
  {
    const files = e.target.files 
    setImages( ( prev ) => [ ...prev, ...Array.from(files) ] );

    if ( files ) {
      const previewUrl = URL.createObjectURL( files[0] )
      setState(previewUrl)
    }else{
      setState(thumb)
    }
  }
  const handleHeroFileChange = ( e ) =>
  {
    const file = e.target.files[ 0 ];
    setDp( file );
    if ( file ) {
      const previewUrl = URL.createObjectURL( file );
      setHero(previewUrl)
    } else {
      setHero(thumb)
    }
  }

  const submit = async()=>{
    try {
      setLoading(true)
      const data = new FormData()
      data.append( 'dp', dp );
      images.forEach( image =>
      {
        data.append('images',image)
      } )
      complementryData.forEach( item =>
      {
        data.append( "suplementryImage", item.file );
      })
      data.append( "opening_date", date )
      // eslint-disable-next-line no-unused-vars
      data.append( "suplementry_product", JSON.stringify( complementryData.map(({file,...rest})=> rest) ) )
      data.append("variation", JSON.stringify(variation))

      Object.entries( formData ).forEach( ( [ key, value ] ) =>
      {
        if ( Array.isArray( value ) ) {
          value.forEach( item =>
          {
            data.append(`${key}[]`,item)
          })
        } else {
          data.append( key, value );
        }
      } )
      
      console.log(data);
      
      const res = await axiosPrivate.post('/product',data,{
        headers:{"Content-Type":"multipart/form-data"}
      } )
      const result = await res.data.data.product
      console.log( result );
      openToast(res.data.message,"success")
      setFormData( {
        name: "",
        category: "",
        slug: [],
        description: "",
        price: "",
        quantity: "",
        discount_type: "",
        discount_amount: "",
        available_till: "",
        delivery_duration: "",
        dispatch_location: "",
        unit: "",
        product_type:""
      })
      setHero( thumb )
      setImg1( thumb )
      setImg2( thumb )
      setImg3( thumb )
      setImg4( thumb )
      setImg5( thumb )
      setVariation( [] )
      setComplemetryData([])
    } catch (error) {
      console.error( error );
      openToast(error.response.data,"error")
    } finally {
      setLoading( false );
      setTimeout( () =>
      {
        closeToast()
      },3000)
    }
  }

  useEffect( () =>
  {
    const getCategories = async () =>{
      try {
        const res = await axiosPrivate.get( '/category' );
        const result = await res.data
        setCategories( result.data.category )
      } catch (error) {
        console.error(error)
      }
    }

    const getDispatchLocations = async () =>
    {
      try {
        const res = await axiosPrivate.get( '/dispatch' );
        const result = await res.data
        setDispatch_location( result.data.location )
      } catch ( e ) {
        console.error(e);
      }
    }
    
    getCategories();
    getDispatchLocations();
  },[axiosPrivate])

  return (
    <div className="p-4 w-full h-full overflow-y-auto">
      <p className="font-extrabold text-xl capitalize text-primary">Add Product</p>
      <div className="grid grid-cols-6 gap-4 rounded-lg my-4 p-3 ">
        <div className="col-span-full lg:col-span-3 border rounded-lg p-4 max-h-[100dvh] overflow-y-auto">
          {/* Hero Image */}
          <div className="h-72 border relative">
            <div className="w-full relative flex items-center justify-center h-full">
              <Image src={hero} className="h-64 w-64 object-contain"/>
            </div>
            <div className="absolute top-0 right-0 z-10 bg-white rounded-lg">
              <div className="border w-10 h-10 flex items-center justify-center">
                <label htmlFor="hero_image" role="button"><FaPencil /></label>
                <input type="file" name="hero_image" id="hero_image" onChange={handleHeroFileChange} className="hidden" />
              </div>
            </div>
          </div>
          {/* Other Image */}
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 my-4">
            {/* Image 1 */}
            <div className="h-28 border relative">
              <div className="w-full relative flex items-center justify-center h-full">
                <Image src={img1} className="h-24 w-24 object-contain"/>
              </div>
              <div className="absolute top-0 right-0 z-10 bg-white rounded-lg">
                <div className="border w-8 h-8 flex items-center justify-center">
                  <label htmlFor="image1" role="button"><FaPencil /></label>
                  <input type="file" name="image1" id="image1" onChange={(e)=>handleFileChange(e,setImg1)} className="hidden" />
                </div>
              </div>
            </div>
            {/* Image 2 */ }
            <div className="h-28 border relative">
              <div className="w-full relative flex items-center justify-center h-full">
                <Image src={img2} className="h-24 w-24 object-contain"/>
              </div>
              <div className="absolute top-0 right-0 z-10 bg-white rounded-lg">
                <div className="border w-8 h-8 flex items-center justify-center">
                  <label htmlFor="image2" role="button"><FaPencil /></label>
                  <input type="file" name="image2" id="image2" onChange={(e)=>handleFileChange(e,setImg2)} className="hidden" />
                </div>
              </div>
            </div>
            {/* Image 3 */ }
            <div className="h-28 border relative">
              <div className="w-full relative flex items-center justify-center h-full">
                <Image src={img3} className="h-24 w-24 object-contain"/>
              </div>
              <div className="absolute top-0 right-0 z-10 bg-white rounded-lg">
                <div className="border w-8 h-8 flex items-center justify-center">
                  <label htmlFor="image3" role="button"><FaPencil /></label>
                  <input type="file" name="image3" id="image3" onChange={(e)=>handleFileChange(e,setImg3)} className="hidden" />
                </div>
              </div>
            </div>
            {/* Image 4 */ }
            <div className="h-28 border relative">
              <div className="w-full relative flex items-center justify-center h-full">
                <Image src={img4} className="h-24 w-24 object-contain"/>
              </div>
              <div className="absolute top-0 right-0 z-10 bg-white rounded-lg">
                <div className="border w-8 h-8 flex items-center justify-center">
                  <label htmlFor="image4" role="button"><FaPencil /></label>
                  <input type="file" name="image4" id="image4" onChange={(e)=>handleFileChange(e,setImg4)} className="hidden" />
                </div>
              </div>
            </div>
            {/* Image 5 */ }
            <div className="h-28 border relative">
              <div className="w-full relative flex items-center justify-center h-full">
                <Image src={img5} className="h-24 w-24 object-contain"/>
              </div>
              <div className="absolute top-0 right-0 z-10 bg-white rounded-lg">
                <div className="border w-8 h-8 flex items-center justify-center">
                  <label htmlFor="image5" role="button"><FaPencil /></label>
                  <input type="file" name="image5" id="image5" onChange={(e)=>handleFileChange(e,setImg5)} className="hidden" />
                </div>
              </div>
            </div>
          </div>
          <Accordion>
            <AccordionItem key="1" aria-label="Supplementary product" title="Complementary Product" indicator={<BsPlus size={24} className="font-extrabold"/>}>
              <Complementry submittedData={complementryData} setSubmittedData={setComplemetryData}/>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="col-span-full lg:col-span-3 border rounded-lg p-4 max-h-[100dvh] overflow-y-auto">
          {/* Form Input field */ }
          <div className="grid grid-cols-6 gap-8">
            <div className="col-span-3">
              <Input
                name="name"
                value={ formData.name }
                onChange={handleChange}
                label="Product Name"
                labelPlacement="outside"
                type="text"
                placeholder="Product Name"
              />
            </div>
            <div className="col-span-3">
              <Select label="Category" name="category" labelPlacement="outside" selectedKeys={ [ formData.category ] } onChange={ handleChange } placeholder="select a category" required>
                { categories.map( category => (
                  <SelectSection showDivider title={ category.name } key={ category.id }>
                    { category.subCategory.map( item => (
                      <SelectItem key={item.name}>{item.name}</SelectItem>
                    ))}
                  </SelectSection>
                ))}
              </Select>
            </div>
            <div className="col-span-full">
              <Input
                name="slug"
                value={ slug }
                onChange={(e)=>handleChange(e,setSlug)}
                label="Slug"
                labelPlacement="outside"
                type="text"
                placeholder="Slug"
                onKeyDown={handleKeyDown}
              />
              { formData.slug.length > 0 ? <div className="flex items-center space-x-4 py-2">
                {
                  formData.slug.map( item => (
                  <p key={item} className="bg-neutral-300 mx-1 text-neutral-700 capitalize rounded-lg p-1">{ item }</p>
                ))
                }
              </div>: null}
            </div>
            <div className="col-span-full">
              <Textarea
                name="description"
                value={ formData.description }
                onChange={handleChange}
                label="Description"
                labelPlacement="outside"
                type="text"
                placeholder="Enter category description"
              />
            </div>
            <div className="col-span-3">
              <Select name="product_type" label="Product Type" placeholder="Enter product type" labelPlacement="outside" selectedKeys={[formData.product_type]} onChange={handleChange}>
                <SelectItem key="physical">Physical</SelectItem>
                <SelectItem key="breakable">Breakable</SelectItem>
              </Select>
            </div>
            <div className="col-span-3">
              <Select name="unit" label="Units" selectedKeys={ [ formData.unit ] } onChange={ handleChange } placeholder="select a unit" labelPlacement="outside">
                <SelectItem key="unit">unit</SelectItem>
                <SelectItem key="kg">kg</SelectItem>
                <SelectItem key="g">g</SelectItem>
                <SelectItem key="cm">cm</SelectItem>
                <SelectItem key="m">m</SelectItem>
                <SelectItem key="lbs">lbs</SelectItem>
              </Select>
            </div>
            <div className="col-span-3 pe-2">
              <Input
                name="price"
                value={ formData.price }
                onChange={handleChange}
                label="Unit Price (in NGN)"
                labelPlacement="outside"
                type="number"
                placeholder="eg:5000"
              />
            </div>
            <div className="col-span-3 ps-1">
              <Input
                name="quantity"
                value={ formData.quantity }
                onChange={handleChange}
                label="Current Stock Qty"
                labelPlacement="outside"
                type="number"
                placeholder="eg: 5"
              />
            </div>
            <div className="col-span-3">
              <Select name="discount_type" selectedKeys={[formData.discount_type]} onChange={handleChange} label="Discount Type" labelPlacement="outside" placeholder="Select discount type">
                <SelectItem key="flat">Flat</SelectItem>
                <SelectItem key="percentage">Percetage</SelectItem>
              </Select>
            </div>
            <div className="col-span-3">
              <Input
                name="discount_amount"
                value={ formData.discount_amount }
                onChange={handleChange}
                label="Discount Amount"
                labelPlacement="outside"
                type="number"
                placeholder="eg: 10%"
              />
            </div>
            <div className="col-span-full xl:col-span-2">
              <DatePicker
                label="Opening Date"
                labelPlacement="outside"
                showMonthAndYearPickers
                name="opening_date"
                onChange={setDate }
                value={date}
              />
            </div>
            <div className="col-span-3 xl:col-span-2">
              <Input
                label="Available till?"
                labelPlacement="outside"
                type="number"
                endContent="days"
                placeholder="eg: 6"
                name="available_till"
                value={ formData.available_till }
                onChange={handleChange}
              />
            </div>
            <div className="col-span-3 xl:col-span-2">
              <Input
                label="Delivery Duration"
                labelPlacement="outside"
                type="number"
                endContent="days"
                placeholder="eg: 10"
                name="delivery_duration"
                value={ formData.delivery_duration }
                onChange={handleChange}
              />
            </div>
            <div className="col-span-full">
              <Accordion>
                <AccordionItem key="1" aria-label="Variation" title="Variation" indicator={<BsPlus size={24} className="font-extrabold"/>}>
                  <Variation variations={variation} setVariations={setVariation}/>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="col-span-full">
              { !dispatch_location  ? (
                <Select label="Dispatch Location" labelPlacement="outside"  placeholder="No location added" required isDisabled>
                </Select>
              ): (
                <Select label="Dispatch Location" name="dispatch_location" labelPlacement="outside" selectedKeys={ [ formData.dispatch_location ] } onChange={ handleChange } placeholder="select a dispatch location" required>
                { dispatch_location.map( category => (
                  <SelectItem key={category.address}>{category.address}</SelectItem>
                ))}
              </Select>
              )}
            </div>
            <div className="col-span-full">
              <Button isLoading={loading} color="primary" variant="flat" className="fon-bold" onClick={submit}>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct;

{/* <div className="col-span-full">
              <p className="text-lg">Variation</p>
              <div className="grid grid-cols-6 gap-4 my-4">
                <div className="col-span-3">
                  <Input
                    name="variationAmount"
                    onChange={ handleChange }
                    labelPlacement="outside"
                    label="Weight"
                    placeholder="e.g 5"
                    value={formData.variationAmount}
                    endContent={
                      <Select name="variationType" aria-label="Units" selectedKeys={ [ formData.variationType ] } onChange={ handleChange } placeholder="unit">
                        <SelectItem key="unit">unit</SelectItem>
                        <SelectItem key="kg">kg</SelectItem>
                        <SelectItem key="g">g</SelectItem>
                        <SelectItem key="cm">cm</SelectItem>
                        <SelectItem key="m">m</SelectItem>
                        <SelectItem key="lbs">lbs</SelectItem>
                      </Select>
                    }
                  />
                </div>
                <div className="col-span-3">
                  <Input
                    name="variationPrice"
                    onChange={ handleChange }
                    labelPlacement="outside"
                    label="Price"
                    placeholder="2"
                    value={formData.variationPrice}
                    endContent={ <div className=" flex  items-center text-tiny">
                      <p>per/</p>
                      <p>{ formData.variationType }</p>
                    </div>}
                  />
                </div>
              </div>
              
              {/* By sizes 
              <div className="grid grid-cols-6">
                <div className="col-span-3 ">
              <label htmlFor="color">Color</label>
              <div className="flex space-x-2 items-center mt-1">
                <Input
                  name="color"
                  onChange={handleChange}
                  labelPlacement="outside"
                  type="color"
                  className="w-20 h-20"
                />
                <Input
                  name="color"
                  onChange={handleChange}
                  labelPlacement="outside"
                  type="color"
                  className="w-20 h-20"
                />
                <Input
                  labelPlacement="outside"
                  name="color"
                  onChange={handleChange}
                  type="color"
                  className="w-20 h-20"
                />
              </div>
            </div>
            <div className="col-span-3">
              <CheckboxGroup
                label="size"
                orientation="horizontal"
                size="sm">
                <Checkbox name="size" onChange={(e)=>handleChange(e,setSize)} value="s">S</Checkbox>
                <Checkbox name="size" onChange={(e)=>handleChange(e,setSize)} value="m">M</Checkbox>
                <Checkbox name="size" onChange={(e)=>handleChange(e,setSize)} value="l">L</Checkbox>
                <Checkbox name="size" onChange={(e)=>handleChange(e,setSize)} value="xl">XL</Checkbox>
                <Checkbox name="size" onChange={(e)=>handleChange(e,setSize)} value="xxl">XXL</Checkbox>
              </CheckboxGroup>
            </div>
            <div className="col-span-3 pe-2">
              <Input
                name="price"
                value={ formData.price }
                onChange={handleChange}
                label="Price (in NGN)"
                labelPlacement="outside"
                type="number"
                placeholder="eg:5000"
              />
            </div>
            <div className="col-span-3 ps-1">
              <Input
                name="quantity"
                value={ formData.quantity }
                onChange={handleChange}
                label="Quantity"
                labelPlacement="outside"
                type="number"
                placeholder="eg: 5"
              />
            </div>
              </div>
            </div> */}//*/}