import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
// import { getrand } from "../../../lib/public";

interface FeatureItem {
  id: string;
  thumbnail?: string;
  title: string;
  summary: string;
}

interface FeatureProps {
  featureList: FeatureItem[];
  ListImg: Array<{ img: string }>;
}

const FeatureList: React.FC<FeatureProps> = ({ featureList, ListImg }) => {
  return (
    <Row className="gap-4 px-4" gutter={16}>
      {featureList.map((item, index) => (
        <Col
          key={index}
          xs={24}
          sm={24}
          md={8}
          lg={8}
          xl={8}
          className="top-feature-v2"
        >
          <div className="top-feature-item relative h-40 rounded-lg shadow-md overflow-hidden">
            <Link to={`/article/${item.id}`}>
              <div className="img-box h-full">
                <img
                  src={
                    item.thumbnail ||
                    // ListImg[getrand(0, ListImg.length - 1)].img
                    ListImg[0].img
                  }
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
              </div>
              <div className="info absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-60 opacity-0 transition-all duration-300">
                <h3 className="text-white text-lg font-bold uppercase px-2 py-1 bg-black bg-opacity-80 transform -translate-x-full transition-transform duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-300 italic text-sm px-4 mt-2 transform translate-x-full transition-transform duration-300">
                  {item.summary}
                </p>
              </div>
            </Link>
          </div>
        </Col>
      ))}
    </Row>
  );
};

const Feature: React.FC<FeatureProps> = (props) => {
  return (
    <div className="hidden md:block">
      <div className="w-full h-auto mt-14">
        <h1 className="text-gray-600 text-base font-bold mt-2.5 pb-1.5 mb-7 border-b border-dashed border-gray-200">
          <i className="iconfont icon-anchor" />
          <span> START:DASH!!</span>
        </h1>
      </div>
      <FeatureList {...props} />
    </div>
  );
};

export default Feature;
