const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id); 
    let review = new Review(req.body.review);
    listing.reviews.push(review);
    review.author = res.locals.currUser._id;
    await review.save();
    await listing.save();
    req.flash("success","New Review Created");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyReview = async (req,res) => {
    let {id,reviewId} = req.params;
    await Review.deleteOne({_id : reviewId});
    await Listing.findByIdAndUpdate(id,{$pull : { reviews :  reviewId }});
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);
}