const express=require('express');
const fs=require('fs');
const tourController=require('./../controller/tourController');
const router=express.Router();


// router.param('id',tourController.checkId)

// tourRouter.get('/',tourController.getalltour);

router.route('/').get(tourController.getalltour).post(tourController.checkbody,tourController.createTour);

router.route('/:id').get(tourController.gettour).patch(tourController.updatecreatetour);
 module.exports=router;