
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import FeaturedDoctors from "@/components/home/FeaturedDoctors";
import HowItWorks from "@/components/home/HowItWorks";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedDoctors />
      <HowItWorks />
    </Layout>
  );
};

export default Index;
