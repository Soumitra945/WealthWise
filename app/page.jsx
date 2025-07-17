import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { featuresData, statsData,howItWorksData, testimonialsData } from "@/data/landing";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    // Remove the conflicting background gradient and mt-40
    <div className="pt-20">
        <Hero />

        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statsData.map((statsData, index)=>(
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {statsData.value}</div>
                  <div className="text-gray-600">{statsData.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12 text-white">
      Everything you need to manage your finances — in one place.
    </h2>
    <div className="dashboard-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuresData.map((feature, index) => (
        <div key={index} className="trading-card bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="space-y-4 pt-4 pb-4">{feature.icon}</div>
          <div className="card-header flex justify-between items-center mb-4">
            <h3 className="card-title text-xl font-semibold text-white">{feature.title}</h3>
          </div>
          <p className="text-white">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

        <section className="py-20 bg-blue-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">How it works?</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {howItWorksData.map((step,index)=>(
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  ))}
              </div>
            </div>
        </section>
        
        <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-white">What our users say?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonialsData.map((testimonial,index)=>(
                <Card key={index} className="p-6">
                  <CardContent className="space-y-4 pt-4">
                    <div className="flex items-center mb-4">
                      <Image 
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                      />
                      <div className="ml-4">
                        <div className="text-xl font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>    
                      </div>
                    </div>
                    <div className="text-gray-600">{testimonial.quote}</div>
                  </CardContent>
                </Card>
                ))}
              </div>
            </div>
        </section>

        <section className="py-20 bg-blue-50">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-center mb-4">
                Ready to take control of your finances?
              </h2>
              <p className="text-white-100 mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already managing their finances with ease.
                Smarter with WealthWise
              </p>

              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:animate-pulse transition-all duration-300 hover:bg-blue-100 font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Start free trial now!
                </Button>
              </Link>

            </div>
        </section>

    </div>
  );
}