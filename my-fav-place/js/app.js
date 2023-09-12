// app.js
document.addEventListener("DOMContentLoaded", function () {
  const reviewsContainer = document.getElementById("reviews-container");
  const addReviewForm = document.getElementById("add-review-form");

  function generateStars(rating) {
    const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
    return stars;
  }

  function createReviewCard(review) {
    const card = document.createElement("div");
    card.classList.add("review-card");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    const reviewerName = document.createElement("h3");
    reviewerName.textContent = review.name;
    cardContainer.appendChild(reviewerName);

    const reviewDate = document.createElement("p");
    reviewDate.textContent = `Date: ${review.date}`;
    cardContainer.appendChild(reviewDate);

    const reviewRating = document.createElement("p");
    reviewRating.textContent = `Rating: ${generateStars(review.rating)}`;
    cardContainer.appendChild(reviewRating);

    const reviewText = document.createElement("p");
    reviewText.textContent = review.review;
    cardContainer.appendChild(reviewText);

    card.appendChild(cardContainer);

    return card;
  }

  function showReviews() {
    reviewsContainer.innerHTML = "";
    window.reviewData.forEach((review) => {
      const card = createReviewCard(review);
      reviewsContainer.appendChild(card);
    });
  }

  addReviewForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = addReviewForm.name.value;
    const date = addReviewForm.date.value;
    const rating = parseInt(addReviewForm.rating.value);
    const reviewText = addReviewForm.review.value;

    const newReview = {
      name: name,
      date: date,
      rating: rating,
      review: reviewText
    };

    window.reviewData.push(newReview);
    showReviews();

    // Clear form fields
    addReviewForm.reset();
  });

  showReviews();
});
