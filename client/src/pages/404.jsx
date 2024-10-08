import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div>
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center ">404</h1>
              </div>
              <div className="contant_box_404">
                <h3 className="h2">Look like youre lost</h3>
                <p>the page you are looking for not avaible!</p>
                <link href="/" className="link_404 bg-green" />
                Go to Home
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  
  );
};

export default NotFound;
