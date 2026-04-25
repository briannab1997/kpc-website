import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Book,
  Cross,
  Heart,
  Users,
  Sparkles,
  Crown,
  Baby,
  Shield
} from "lucide-react";

const beliefSections = [
  {
    title: "The Word of God",
    icon: Book,
    content: "At Kentish Publishing Company, we affirm that the Holy Bible is the primary and authoritative text of God, divinely inspired and wholly sufficient for instruction, correction, and revelation. We believe that the Scriptures were written by prophets and disciples under the guidance of the Holy Spirit, and that the Bible is fully and unequivocally the Word of God. As affirmed in John 1:1, 'In the beginning was the Word, and the Word was with God, and the Word was God.' This foundational passage underscores our conviction that the Word is both eternal and incarnate in Jesus Christ, through whom all things were made and in whom life and light dwell."
  },
  {
    title: "Salvation",
    icon: Cross,
    content: "We believe that salvation is granted by the grace of God alone, not earned by human effort or merit. It is a divine gift extended to all who accept Jesus Christ as Lord and Savior. This foundational doctrine affirms that redemption and reconciliation with God are made possible solely through His unmerited favor, reflecting the profound truth that it is by grace we have been saved, through faith, and not by works, so that no one may boast (Ephesians 2:8-9)."
  },
  {
    title: "Baptism",
    icon: Heart,
    content: "We believe that baptism is a public and outward expression of an inward transformation - a visible testimony of faith in Jesus Christ. It signifies the washing away of past sins and marks the believer's rebirth into a new life in Christ. Baptism is not merely a ritual, but a sacred act of obedience and spiritual renewal. We affirm that this act should be a conscious and voluntary decision made by the individual, reflecting personal conviction and commitment to the Christian faith. In accordance with biblical practice, we hold that baptism should be administered through full water immersion, symbolizing the believer's death to sin and resurrection into new life, as modeled by Christ Himself."
  },
  {
    title: "Jesus Christ",
    icon: Crown,
    content: "We believe that Jesus Christ is the eternal Son of God, fully divine and fully human, sent by the Father for the redemption of humanity. He lived a sinless life, was crucified, and died as a sacrifice for the sins of the world. On the third day, He rose from the dead, conquering sin and death, and securing the promise of eternal life for all who believe in Him. His resurrection affirms His divinity, fulfills the Scriptures, and stands as the cornerstone of the Christian faith. Through His life, death, and resurrection, Jesus provides the only path to salvation and reconciliation with God."
  },
  {
    title: "God the Father",
    icon: Shield,
    content: "We believe that God is the sovereign Creator of the heavens and the earth, the originator of all life and the entirety of the universe. By His divine will and power, all things were made and continue to be sustained. He is eternal, omnipotent, and unchanging, worthy of all glory and worship. We affirm that God is the Father of our Lord and Savior, Jesus Christ, and that through this divine relationship, the fullness of God's love, authority, and redemptive purpose is revealed to humanity."
  },
  {
    title: "Sin & Repentance",
    icon: Heart,
    content: "We believe that all humanity inherited a sinful nature as a result of the fall of Adam and Eve, through whom sin entered the world. As Scripture teaches, all have sinned and fall short of the glory of God (Romans 3:23). We believe that all human beings are sinners in need of redemption, and that God, in His mercy, sent His only Son, Jesus Christ, to die on the cross as the atoning sacrifice for our sins. Upon receiving this gift of grace, believers are called to repentance - a conscious, heartfelt turning away from sin and a sincere return to God. Repentance involves not only remorse but a transformative commitment to live in obedience to God's will."
  },
  {
    title: "Women in Ministry",
    icon: Users,
    content: "We believe that women have a God-ordained and valuable place in ministry. Throughout Scripture, God has used women to fulfill His purposes, empowering them to pray, fast, teach, and serve within the body of Christ. We affirm that women are called to spiritual growth and active participation in the advancement of God's Kingdom through fellowship, discipleship, and leadership. Accordingly, we believe that women may be appointed to hold spiritual offices and leadership roles, as God equips and calls them, recognizing their gifts and contributions as vital to the life and ministry of the Church."
  },
  {
    title: "Men in Ministry",
    icon: Users,
    content: "We believe that both men and women are called and equipped by God to serve in ministry and to hold positions of spiritual leadership. Leadership within the Church is not determined by gender, but by divine calling, character, and gifting. We affirm the equal worth and spiritual authority of both men and women in fulfilling God's purposes for the edification of the body of Christ."
  },
  {
    title: "Children in Ministry",
    icon: Baby,
    content: "We believe that children are a vital and integral part of the Kingdom of God. Scripture affirms their value, purity, and capacity to receive divine truth. God uses children not only as recipients of spiritual teaching but also as vessels of His presence - endowing them with spiritual gifts, insight, and a unique innocence that reflects His heart. We affirm that children can serve meaningfully within ministry settings, offering support, guidance, and even leadership in ways appropriate to their maturity and calling. As Jesus Himself declared, 'Let the little children come to me... for the kingdom of heaven belongs to such as these' (Matthew 19:14)."
  },
  {
    title: "Spiritual Gifts",
    icon: Sparkles,
    content: "We believe that spiritual gifts are active and prevalent in the Church today, just as they were during the biblical era. These gifts are administered by the Holy Spirit, who distributes them according to God's sovereign will. As affirmed in 1 Corinthians 12:11, 'It is the one and only Spirit who distributes all these gifts. He alone decides which gift each person should have.' We hold that spiritual gifts may be bestowed upon anyone, at any time, regardless of age, gender, or background. These gifts are not for personal gain or recognition, but are to be used solely for the glory of God, the advancement of His Kingdom, and the fulfillment of His divine purposes."
  },
  {
    title: "Spiritual Leadership",
    icon: Crown,
    content: "We believe that God calls all individuals - both men and women - into spiritual fellowship, and that He appointed some to positions of leadership within the body of Christ. Scripture identifies a diversity of spiritual offices through which believers may serve, including apostles, prophets, evangelists, pastors, and teachers, as stated in Ephesians 4:11-12. We affirm that God's calling to leadership is not limited by external factors such as age, appearance, background, or gender. As 1 Samuel 16:7 declares, 'For the Lord does not see as man sees; for man looks at the outward appearance, but the Lord looks at the heart.' Spiritual authority is entrusted according to God's wisdom and purpose, and those called to lead are to do so with humility, faithfulness, and a heart aligned with His will."
  }
];

export default function Beliefs() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-cream-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Theology & Beliefs</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            As a Christian publishing organization, Kentish Publishing Company is founded upon a clearly defined set
            of theological convictions that inform our mission, operations, and identity. While we recognize and respect
            the theological diversity among authors and collaborators, we believe it is important to share the core beliefs
            that constitute the spiritual foundation of our company.
          </p>
        </div>
      </section>

      {/* Faith Declaration */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl">
            <CardContent className="p-12 text-center">
              <Cross className="w-16 h-16 mx-auto mb-6 text-white" />
              <h2 className="text-3xl font-bold mb-6">Our Foundation</h2>
              <blockquote className="text-xl leading-relaxed">
                We profess our love for the Lord our God and affirm that Jesus Christ is our Lord and Savior,
                the foundation of our faith and the guiding presence in all that we do.
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Belief Sections */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-cream-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {beliefSections.map((belief) => (
              <Card key={belief.title} className="hover:shadow-xl transition-shadow duration-300 border-red-100">
                <CardHeader className="bg-gradient-to-r from-red-50 to-cream-50 border-b border-red-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg">
                      <belief.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      What We Believe About {belief.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {belief.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">United in Faith, Committed to Excellence</h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            These principles reflect the heart of our institutional ethos and provide a framework through which
            we engage with the work of publishing and ministry. We are committed to serving authors and readers
            with integrity, excellence, and unwavering faith in our Lord Jesus Christ.
          </p>
        </div>
      </section>
    </div>
  );
}
