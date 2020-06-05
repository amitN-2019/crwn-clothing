import React ,{useEffect} from 'react';
import { Route } from 'react-router-dom';
import { fetchCollectionStart } from '../../redux/shop/shop.actions'; 
import  {connect}  from 'react-redux';
import CollectionsPageContainer from '../collections/collections.container';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';



const  ShopPage = ( {fetchCollectionStart ,  match }) =>{
 

   useEffect(() => {
      fetchCollectionStart()
    
     } ,[fetchCollectionStart]) ;
         
  
  
 return (
     
<div className='shop-page'>
 <Route exact path={`${match.path}`} component={CollectionsOverviewContainer}/>
    <Route path={`${match.path}/:collectionId`} component={CollectionsPageContainer} />       
    </div>
   )
 
}
 
 

 
const mapDispatchToProps = dispatch => ({
   fetchCollectionStart: () => dispatch(fetchCollectionStart())
 
})

    export default  connect(null, mapDispatchToProps)(ShopPage); 

 