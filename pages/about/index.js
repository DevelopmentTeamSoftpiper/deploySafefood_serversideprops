import CustomHead from "@/components/CustomHead";
import React from "react";

const About = () => {
  return (
    <>
      <CustomHead
        title=" Safefoods | About "
        url="https://safefoods.com.bd/about"
      />

      <div className="container text-justify my-10 p-5">
        <h1 className="text-center"> About </h1>
        <div>
          <h5> Why We Start? </h5>
          <p>
            Bangladesh is an agriculture based country. Nowadays we are nearly
            food sufficient but safe or quality food is a question. In our
            conventional system most of the producers, handlers, whole salers,
            retailaers at different stages in the distribution chain are
            knowingly or unknowingly using harmful chemicals to grow, process
            and preserve foods which is detrimental to health. As an example
            farmers are known to use antibiotic, growth promoter, toxic
            pesticides containing Organo Chlorinate, Mercury, Lead, Chromium,
            Organo Phosphate, coloring agent and numerous other hazardous
            poisonous chemicals to ensure maximum production all year long.
            These chemicals cause hazardous damage to our health resulting in
            cancer, kidney failure, infertility and various health problem. But
            the positive scenerio is that nowadays the awarness is raising among
            the producers & consumers about food safety.
          </p>
        </div>
        <div>
          <h5>What We Do?</h5>
          <p>
            APYZ Safe Foods Agro Ltd. is an agriculture based private company
            which started from 2016. Safe Foods is a social movement against
            adulteration and harmful effect of different food items what we
            consume daily. We are the social entrepreneurs, graduates of
            Bangladesh Agricultural University, Mymensingh. We are now dealing
            with branded products named Brown Rice, Brown Atta, Lentil, Safe
            broiler, Safe egg, Milk, Beef, Deshi Chicken, Pure Honey, Mustard
            Oil, Ghee, Brown sugar etc. We ensure you that the products we
            deliver are directly supervised by us and fulfill the safe and best
            quality food criteria what we mention.
          </p>
        </div>
        <div>
          <h5> Our Mission </h5>
          <p>Maximum Consumer satisfaction with max. farmer satisfaction.</p>
        </div>
        <div>
          <h5> Our Vision</h5>
          <p>To establish Safe foods brand & lead from front by 2030.</p>
        </div>

        <div>
          <h5> Management Team</h5>
          <ul>
            <li>Muhammad Ahsan Habib, Chairman, APYZ Safe Foods Agro Ltd.</li>
            <li>Muhammad Yusuf, ED, APYZ Safe Foods Agro Ltd.</li>
            <li>Zikrul Hakim, MD, APYZ Safe Foods Agro Ltd.</li>
          </ul>
        </div>

        <div>
          <h5> Business Activities </h5>
          <ul>
            <li>Poultry</li>
            <li>Safe Broiler farm</li>
            <li>Safe Layer farm</li>
            <li>Beef farm</li>
            <li>Dairy Farm (projected)</li>
            <li>Feed Mill (Projected)</li>
            <li>Trading business</li>
            <li>Shop</li>
          </ul>
        </div>

        <div>
          <h5> Social Responsibility </h5>
          <p>
            {" "}
            Alhamdulillah we are trying to run two sustainable project. They
            are-{" "}
          </p>
          <ul>
            <li>Tubewell Project</li>
            <li>Yatim project (Monthly donate)</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default About;
