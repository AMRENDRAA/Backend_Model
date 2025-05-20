const express=require('express');
const fs=require('fs');
const tourController=require('./../controller/tourController');
const authController=require('./../controller/authController')
const router=express.Router();


// router.param('id',tourController.checkId)

// tourRouter.get('/',tourController.getalltour);

router.route('/').get(authController.protect,tourController.getalltour).post(tourController.checkbody,tourController.createTour);
router.route('/:id').get(tourController.gettour).patch(tourController.updatecreatetour).delete(authController.protect,authController.restrictTo(['admin']),tourController.deletetour);
module.exports=router;

