import Image from "next/image"

export default function AboutSections() {
    return (
        <div className="container px-4 py-16 mx-auto space-y-24">
            {/* History Section */}
            <section className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 pl-12">
                    <h2 className="text-2xl font-bold text-purple-500 text-center">Our History</h2>
                    <div className="space-y-4 text-gray-600">
                        <p>
                            Throughout 2020, our team of passionate individuals set out prepared to identify the first success point of artificial intelligence and after observing the way the challenges faced by development teams in delivering production ready code and managing deployments did not have much to do with code.
                        </p>
                        <p>
                            We realized that the real challenge was bringing development teams together with a shared vision to create a platform that would empower them to focus on building great solutions, not wasting time deploying them.
                        </p>
                        <p>
                            Today, we are proud to offer a comprehensive DevOps solution that helps teams of all sizes deliver better software with collaboration at production-ready levels out-of-the-box.
                        </p>
                    </div>
                </div>
                <div className="relative h-[300px] md:h-[400px]">
                    <Image
                        src="/team.png"
                        alt="Team collaboration illustration"
                        fill
                        className="object-contain"
                    />
                </div>
            </section>

            {/* Mission Section */}
            <section className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[300px] md:h-[400px] md:order-first">
                    <Image
                        src="/mission.png"
                        alt="Innovation illustration"
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="space-y-4 pr-12">
                    <h2 className="text-2xl font-bold text-purple-500 text-center">Our Mission</h2>
                    <p className="text-gray-600">
                        We are committed to revolutionizing the DevOps experience by providing development teams of all
                        sizes to deploy, manage, and scale their applications with ease. As industry shifts to
                        microservices architectures, we understand the growing need for robust deployment solutions. Our
                        mission is to help companies innovate faster and deliver better software to their users.
                    </p>
                </div>
            </section>
        </div>
    )
}

