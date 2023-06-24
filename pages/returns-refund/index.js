import Head from 'next/head';
import React from 'react';

const Return = () => {
    return (
   <>
   <Head>
      <title>Safefoods|Returns and Refund</title>
      <meta name="description" content = "Safefoods: For Your Family" />
      <link rel="icon" href="/assets/images/logo-safefoods.png" />

    </Head>
        <div className='container  my-8 p-5'>
            <h3>
                 Return Policy
            </h3>
            <p>
                    A user may return any product during the time of delivery, if:
            </p>
            <ol>
                <li>
                    The product does not meet the user’s expectations.
                </li>
                <li>
                    Found damaged during delivery.
                </li>
                <li>
                    Have doubts about the product quality and quantity.
                </li>
                <li>
                    Received in an unhealthy/ unexpected condition.
                </li>
                <li>
                    Is not satisfied with the packaging.
                </li>
                <li>
                    Find product unusable
                </li>
            </ol>
            <p>
                We are continuously monitoring the accounts of customers with excessive requests for returns and refunds. We take the necessary steps to prevent this.
            </p>

            <p>
                But following products may not be eligible for return or replacement:
            </p>
            <ul>
                <li> Unable to serve with any product. </li>
                <li> Customer returns any product from a paid order. </li>
                <li> The customer cancels a paid order before it has been dispatched. </li>
            </ul>
            <p>
                For all the above three scenarios, the refund amount will be sent to the customer. Refund is only allowed for customers who have paid via bKash or card or other electronic method. For the orders that are paid via Cash, a refund is only to be given through conditions.
            </p>
            
        </div>
   </>
    );
};

export default Return;