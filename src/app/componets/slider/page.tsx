import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div>
        <img
          src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-19012024-URGENCYSTRIPS-lastday.gif"
          className="h-[100px] w-full mt-20"
        />
      </div>
      <Carousel
        autoPlay={true}
        showThumbs={false}
        showArrows={false}
        infiniteLoop={true}
        showIndicators={true}
        showStatus={false}
        emulateTouch={true}
        useKeyboardArrows={true}
        className="mt-6"
      >
        <div>
          <img
            src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-26124-DailyBanner-Z5-P3-NewBalance-UnderArmour-upto50.jpg"
            className="h-[450px] object-contain"
          />
        </div>
        <div>
          <img
            src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-26124-DailyBanner-Z5-P1-RedTape-Ausk-flat75.jpg"
            className="h-[450px] object-contain"
          />
        </div>
        <div>
          <img
            src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-26124-NC-Z5-P5-LinoPerros-AccessorizeLondon-UPTO70.jpg"
            className="h-[450px] object-contain"
          />
        </div>
        <div>
          <img
            src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-26124-DailyBanner-Z5-P4-Netplay-dnmx-Under499.jpg"
            className="h-[450px] object-contain"
          />
        </div>

        <div>
          <img
            src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-19012024-MainBannerDailyChanging-Z1-P3-BESTOFAJIO.gif"
            className="h-[450px] object-contain"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default page;
