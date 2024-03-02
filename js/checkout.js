                        function validateAndSubmitForm() {
                          if (!validateForm()) {
                            return false;
                          }

                          // Prevent the default form submission behavior
                          event.preventDefault();

                          // Show the popup
                          showPopup();

                          return false; // Prevent further propagation
                        }

                        function validateForm() {
                          var fullName = document.forms["orderForm"]["fullName"].value;
                          var email = document.forms["orderForm"]["email"].value;
                          var address = document.forms["orderForm"]["address"].value;
                          var phone = document.forms["orderForm"]["phone"].value;
                          var productName = document.forms["orderForm"]["productName"].value;
                          var homeDeliveryCheckbox = document.getElementById("deliveryOption");
                          var locationDropdown = document.getElementById("location");
                          var subLocationDropdown = document.getElementById("subLocation");
                          var landMark = document.forms["orderForm"]["landMark"].value;

                          // Add more validation checks as needed
                          if (fullName === "" || email === "" || address === "" || phone === "" || productName === "") {
                            alert("Please fill out all the required fields!");
                            return false;
                          }



                          // Check if home delivery is selected and validate location, area, and payment screenshot
                          if (homeDeliveryCheckbox.checked) {
                            if (locationDropdown.value === "default") {
                              alert("Please select a location!");
                              return false;
                            }

                            if (locationDropdown.value === "nayabazar" && subLocationDropdown.value === "default") {
                              alert("Please select an area inside Nayabazar!");
                              return false;
                            }

                            if (landMark === "") {
                              alert("Please provide a landmark for delivery!");
                              return false;
                            }

                          }

                          // You can add more specific validation checks here

                          return true;
                        }




                      
                        const ProductsSelect = document.getElementById('Products');
                        const priceContainer = document.getElementById('priceContainer');
                        const productPrice = document.getElementById('productPrice');
                        const totalPriceContainer = document.getElementById('totalPrice');

                        const prices = {
                          Chini: 110,
                          Mishri: 180,
                          Chana: 140,
                          'musuri-daal': 180,
                          'Kaalo-Daal': 160,
                        };





                        ProductsSelect.addEventListener('change', () => {
                          const selectedOption = ProductsSelect.value;
                          const selectedPrice = prices[selectedOption];

                          productPrice.textContent = `Rs. ${selectedPrice}`;
                          totalPriceContainer.textContent = `Rs. ${selectedPrice}`; // Set default and total price to product price
                          priceContainer.style.display = 'block';

                          window.history.pushState(null, null, `?option=${selectedOption}`);
                        });

                        window.addEventListener('load', () => {
                          const urlParams = new URLSearchParams(window.location.search);
                          const selectedOption = urlParams.get('option');

                          if (selectedOption) {
                            ProductsSelect.value = selectedOption;
                            ProductsSelect.dispatchEvent(new Event('change'));
                          }
                        });

                        function updatePrice() {
                          var quantityInput = document.getElementById('quantity');
                          var productQuantityInput = document.getElementById('productQuantity');

                          var quantity = parseInt(quantityInput.value);
                          var selectedOption = ProductsSelect.value;
                          var selectedPrice = prices[selectedOption];
                          var totalPrice = quantity * selectedPrice;

                          productQuantityInput.value = quantity; // Set productQuantity input value to the selected quantity

                          // Set the product price to the productPrice element
                          productPrice.textContent = `Rs. ${selectedPrice}`;

                          // Set the perProductPrice input value to the selectedPrice
                          document.getElementById('perProductPrice').value = selectedPrice;

                          totalPriceContainer.textContent = `Rs. ${totalPrice}`;

                          // Set the value of the TotalPrice input field
                          document.getElementById('TotalPrice').value = totalPrice; // Add this line to set the value
                        }


                        function incrementQuantity() {
                          var quantityInput = document.getElementById("quantity");
                          quantityInput.value = parseInt(quantityInput.value) + 1;
                          updatePrice();
                        }

                        function decrementQuantity() {
                          var quantityInput = document.getElementById("quantity");
                          if (parseInt(quantityInput.value) > 1) {
                            quantityInput.value = parseInt(quantityInput.value) - 1;
                            updatePrice();
                          }
                        }





                      
                        // This line declares a variable called "url" and assigns it a value of "Api_Endpoint_Url"
                        let url = "https://script.google.com/macros/s/AKfycbxAs1Nhfp2-_hCVA_9hG4_OuPAnVtMUs4NR9WYL8bDlJX-8uDllg78jf5iW0Z1h6l-X/exec";
                        // This line declares a variable called "file" and assigns it the value of the modified input element on the page
                        let file = document.getElementById("paymentScreenshot");
                        // This line declares a variable called "img" and assigns it the value of the modified image element on the page
                        let img = document.querySelector("img");
                        file.addEventListener('change', () => {
                          let fr = new FileReader();
                          fr.addEventListener('loadend', () => {
                            let res = fr.result;
                            img.src = res;
                            let spt = res.split("base64,")[1];
                            let obj = {
                              base64: spt,
                              type: file.files[0].type,
                              name: file.files[0].name
                            }
                            fetch(url, {
                              method: "POST",
                              body: JSON.stringify(obj)
                            })
                              .then(r => r.text())
                              .then(data => console.log(data))
                          })
                          fr.readAsDataURL(file.files[0])
                        })



                      $(function () {

                          var targetDate = new Date(Date.UTC(2023, 03, 8));
                          var now = new Date();

                          window.days = daysBetween(now, targetDate);
                          var secondsLeft = secondsDifference(now, targetDate);
                          window.hours = Math.floor(secondsLeft / 60 / 60);
                          secondsLeft = secondsLeft - (window.hours * 60 * 60);
                          window.minutes = Math.floor(secondsLeft / 60);
                          secondsLeft = secondsLeft - (window.minutes * 60);
                          console.log(secondsLeft);
                          window.seconds = Math.floor(secondsLeft);

                          startCountdown();
                        });
                        var interval;

                        function daysBetween(date1, date2) {
                          //Get 1 day in milliseconds
                          var one_day = 1000 * 60 * 60 * 24;

                          // Convert both dates to milliseconds
                          var date1_ms = date1.getTime();
                          var date2_ms = date2.getTime();

                          // Calculate the difference in milliseconds
                          var difference_ms = date2_ms - date1_ms;

                          // Convert back to days and return
                          return Math.round(difference_ms / one_day);
                        }

                        function secondsDifference(date1, date2) {
                          //Get 1 day in milliseconds
                          var one_day = 1000 * 60 * 60 * 24;

                          // Convert both dates to milliseconds
                          var date1_ms = date1.getTime();
                          var date2_ms = date2.getTime();
                          var difference_ms = date2_ms - date1_ms;
                          var difference = difference_ms / one_day;
                          var offset = difference - Math.floor(difference);
                          return offset * (60 * 60 * 24);
                        }



                        function startCountdown() {
                          $('#input-container').hide();
                          $('#countdown-container').show();

                          displayValue('#js-days', window.days);
                          displayValue('#js-hours', window.hours);
                          displayValue('#js-minutes', window.minutes);
                          displayValue('#js-seconds', window.seconds);

                          interval = setInterval(function () {
                            if (window.seconds > 0) {
                              window.seconds--;
                              displayValue('#js-seconds', window.seconds);
                            } else {
                              // Seconds is zero - check the minutes
                              if (window.minutes > 0) {
                                window.minutes--;
                                window.seconds = 59;
                                updateValues('minutes');
                              } else {
                                // Minutes is zero, check the hours
                                if (window.hours > 0) {
                                  window.hours--;
                                  window.minutes = 59;
                                  window.seconds = 59;
                                  updateValues('hours');
                                } else {
                                  // Hours is zero
                                  window.days--;
                                  window.hours = 23;
                                  window.minutes = 59;
                                  window.seconds = 59;
                                  updateValues('days');
                                }
                                // $('#js-countdown').addClass('remove');
                                // $('#js-next-container').addClass('bigger');
                              }
                            }
                          }, 1000);
                        }


                        function updateValues(context) {
                          if (context === 'days') {
                            displayValue('#js-days', window.days);
                            displayValue('#js-hours', window.hours);
                            displayValue('#js-minutes', window.minutes);
                            displayValue('#js-seconds', window.seconds);
                          } else if (context === 'hours') {
                            displayValue('#js-hours', window.hours);
                            displayValue('#js-minutes', window.minutes);
                            displayValue('#js-seconds', window.seconds);
                          } else if (context === 'minutes') {
                            displayValue('#js-minutes', window.minutes);
                            displayValue('#js-seconds', window.seconds);
                          }
                        }

                        function displayValue(target, value) {
                          var newDigit = $('<span></span>');
                          $(newDigit).text(pad(value))
                            .addClass('new');
                          $(target).prepend(newDigit);
                          $(target).find('.current').addClass('old').removeClass('current');
                          setTimeout(function () {
                            $(target).find('.old').remove();
                            $(target).find('.new').addClass('current').removeClass('new');
                          }, 900);
                        }

                        function pad(number) {
                          return ("0" + number).slice(-2);
                        }</script>






                      
                        var TxtType = function (el, toRotate, period) {
                          this.toRotate = toRotate;
                          this.el = el;
                          this.loopNum = 0;
                          this.period = parseInt(period, 10) || 2000;
                          this.txt = '';
                          this.tick();
                          this.isDeleting = false;
                        };

                        TxtType.prototype.tick = function () {
                          var i = this.loopNum % this.toRotate.length;
                          var fullTxt = this.toRotate[i];

                          if (this.isDeleting) {
                            this.txt = fullTxt.substring(0, this.txt.length - 1);
                          } else {
                            this.txt = fullTxt.substring(0, this.txt.length + 1);
                          }

                          this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

                          var that = this;
                          var delta = 100 - Math.random() * 50;

                          if (this.isDeleting) {
                            delta /= 2;
                          }

                          if (!this.isDeleting && this.txt === fullTxt) {
                            delta = 800; // Set a 1-second delay after displaying text
                            this.isDeleting = true;
                          } else if (this.isDeleting && this.txt === '') {
                            this.isDeleting = false;
                            this.loopNum++;
                            delta = 500;
                          }

                          setTimeout(function () {
                            that.tick();
                          }, delta);
                        };

                        window.onload = function () {
                          var elements = document.getElementsByClassName('typewrite');
                          for (var i = 0; i < elements.length; i++) {
                            var toRotate = elements[i].getAttribute('data-type');
                            var period = elements[i].getAttribute('data-period');
                            if (toRotate) {
                              new TxtType(elements[i], JSON.parse(toRotate), period);
                            }
                          }
                          // INJECT CSS
                          var css = document.createElement("style");

                          css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
                          document.body.appendChild(css);
                        };


                      
                        const btn = document.getElementById('btn');

                        btn.addEventListener('click', () => {
                          // 👇️ hide button
                          btn.style.display = 'none';

                          // 👇️ show div
                          const box = document.getElementById('box');
                          box.style.display = 'block';
                        });




                      
                        const ban = document.getElementById('ban');

                        ban.addEventListener('click', () => {
                          // 👇️ hide button
                          ban.style.display = 'none';

                          // 👇️ show div
                          const box = document.getElementById('bax');
                          box.style.display = 'block';
                        });



                      
                        const bbn = document.getElementById('bbn');

                        bbn.addEventListener('click', () => {
                          // 👇️ hide button
                          bbn.style.display = 'none';

                          // 👇️ show div
                          const bbx = document.getElementById('bbx');
                          bbx.style.display = 'block';
                        });


                      
                        const bcn = document.getElementById('bcn');

                        bcn.addEventListener('click', () => {
                          // 👇️ hide button
                          bcn.style.display = 'none';

                          // 👇️ show div
                          const bcx = document.getElementById('bcx');
                          bcx.style.display = 'block';
                        });



                      
                        // Get the modal
                        var modal = document.getElementById("myModal");

                        // Get the image and insert it inside the modal - use its "alt" text as a caption
                        var img = document.getElementById("myImg");
                        var modalImg = document.getElementById("img01");
                        var captionText = document.getElementById("caption");
                        img.onclick = function () {
                          modal.style.display = "block";
                          modalImg.src = this.src;
                          captionText.innerHTML = this.alt;
                        }

                        // Get the <span> element that closes the modal
                        var span = document.getElementsByClassName("close")[0];

                        // When the user clicks on <span> (x), close the modal
                        span.onclick = function () {
                          modal.style.display = "none";
                        }



                      <script src="assets/js/navbar.js"></script>

                      
                        // JavaScript to trigger the fade-in effect after a delay (e.g., 2 seconds)
                        document.addEventListener("DOMContentLoaded", function () {
                          setTimeout(function () {
                            document.getElementById('overlay').style.opacity = '1';
                          }, 2000); // Adjust the delay as needed
                        });




                      
                        $(document).ready(function () {
                          // Event listener for dropdown change
                          $("#Products").change(function () {
                            // Get the selected option value
                            var selectedProduct = $(this).val();

                            // Set the value of the "Product Name" input field
                            $("#productName").val(selectedProduct);

                            // Modify the URL (you can customize this as needed)
                            var newURL = "index?product=" + selectedProduct;
                            window.history.replaceState(null, null, newURL);
                          });
                        });

                      
                        // To show the input field
                        function showProductInput() {
                          document.getElementById("productName").style.display = "block";
                        }

                        // To hide the input field again
                        function hideProductInput() {
                          document.getElementById("productName").style.display = "none";
                        }

                      
                        function handleDeliveryOption() {
                          var totalAmount = parseFloat(document.getElementById("TotalPrice").value);
                          var deliveryCheckbox = document.getElementById("deliveryOption");
                          var uploadSection = document.getElementById("uploadSection");

                          // Check if totalAmount is NaN or below 500
                          if (isNaN(totalAmount) || totalAmount < 500) {
                            if (deliveryCheckbox.checked) {
                              alert("Home delivery is only available for orders above Rs. 500!");
                              deliveryCheckbox.checked = false; // Uncheck the checkbox
                            }
                          }

                          // If "Yes" is selected, show the upload section; otherwise, hide it
                          uploadSection.style.display = deliveryCheckbox.checked ? "block" : "none";

                          // Return true to allow the checkbox state to change
                          return true;
                        }

                      
                        // Add this to your existing script or script tag
                        function showPopup() {
                          document.getElementById('orderSuccessPopup').style.display = 'flex';
                        }

                        function closePopup() {
                          document.getElementById('orderSuccessPopup').style.display = 'none';
                        }


