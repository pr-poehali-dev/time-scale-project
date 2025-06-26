import { useState } from "react";
import {
  Calculator,
  Truck,
  Clock,
  Shield,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Star,
  Users,
  Award,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const materials = [
  {
    id: "sand",
    name: "Песок строительный",
    price: 800,
    unit: "м³",
    desc: "Идеален для строительных работ",
  },
  {
    id: "soil",
    name: "Чернозем плодородный",
    price: 1200,
    unit: "м³",
    desc: "Для садовых и огородных работ",
  },
  {
    id: "peat",
    name: "Торф натуральный",
    price: 900,
    unit: "м³",
    desc: "Улучшает структуру почвы",
  },
  {
    id: "gravel",
    name: "Щебень фракция 5-20",
    price: 1100,
    unit: "м³",
    desc: "Для дорожных работ",
  },
  {
    id: "clay",
    name: "Глина техническая",
    price: 700,
    unit: "м³",
    desc: "Для промышленных нужд",
  },
  {
    id: "concrete",
    name: "Бетон М200-М400",
    price: 3500,
    unit: "м³",
    desc: "Готовый бетон любых марок",
  },
];

const distances = [
  { id: "0-10", name: "До 10 км", multiplier: 1, price: 500 },
  { id: "10-25", name: "10-25 км", multiplier: 1.5, price: 750 },
  { id: "25-50", name: "25-50 км", multiplier: 2, price: 1000 },
  { id: "50+", name: "Свыше 50 км", multiplier: 3, price: 1500 },
];

const advantages = [
  {
    icon: Clock,
    title: "Быстрая доставка",
    desc: "Доставляем в день заказа или к назначенному времени",
  },
  {
    icon: Shield,
    title: "Гарантия качества",
    desc: "Все материалы сертифицированы и соответствуют ГОСТ",
  },
  {
    icon: Truck,
    title: "Собственный автопарк",
    desc: "40+ единиц техники различной грузоподъемности",
  },
  {
    icon: Users,
    title: "Опытная команда",
    desc: "Более 10 лет на рынке строительных материалов",
  },
];

const stats = [
  { number: "5000+", label: "Довольных клиентов" },
  { number: "15000+", label: "Тонн доставлено" },
  { number: "24/7", label: "Работаем круглосуточно" },
  { number: "100%", label: "Гарантия качества" },
];

export default function App() {
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [volume, setVolume] = useState("");
  const [distance, setDistance] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [materialCost, setMaterialCost] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);

  const calculateCost = () => {
    if (!selectedMaterial || !volume || !distance) return;

    const material = materials.find((m) => m.id === selectedMaterial);
    const distanceData = distances.find((d) => d.id === distance);

    if (material && distanceData) {
      const matCost = material.price * parseInt(volume);
      const delCost = distanceData.price;
      setMaterialCost(matCost);
      setDeliveryCost(delCost);
      setTotalCost(matCost + delCost);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px)`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        <div className="relative py-24 px-4 text-center text-white">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm mb-6 backdrop-blur-sm">
              <Award className="w-4 h-4" />
              <span>Лидер в области доставки сыпучих материалов</span>
            </div>

            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Доставка сыпучих
              <br />
              <span className="text-yellow-400">материалов №1</span>
            </h1>

            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
              Песок, щебень, чернозем, торф, глина и бетон с доставкой по Москве
              и области. Качество ГОСТ, собственный автопарк, работаем 24/7
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm">
              {[
                { icon: Clock, text: "Доставка в день заказа" },
                { icon: Shield, text: "Гарантия качества ГОСТ" },
                { icon: Truck, text: "Собственный автопарк 40+ машин" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 text-lg"
              >
                Рассчитать стоимость
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg"
              >
                Позвонить сейчас
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Наши материалы
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Широкий ассортимент качественных сыпучих материалов для любых
              строительных задач
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material) => (
              <Card
                key={material.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-b from-white to-gray-50"
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {material.name}
                    </CardTitle>
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Truck className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <CardDescription className="text-2xl font-bold text-blue-600">
                    от {material.price.toLocaleString()} ₽/{material.unit}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{material.desc}</p>
                  <div className="flex items-center text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Соответствует ГОСТ</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Калькулятор стоимости
            </h2>
            <p className="text-xl text-gray-600">
              Рассчитайте точную стоимость материалов и доставки за 30 секунд
            </p>
          </div>

          <Card className="shadow-2xl border-0">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700">
                    Выберите материал
                  </label>
                  <Select
                    value={selectedMaterial}
                    onValueChange={setSelectedMaterial}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Выберите материал" />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((material) => (
                        <SelectItem key={material.id} value={material.id}>
                          <div className="flex justify-between w-full">
                            <span>{material.name}</span>
                            <span className="text-blue-600 font-semibold ml-4">
                              {material.price.toLocaleString()} ₽/
                              {material.unit}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700">
                    Объем (м³)
                  </label>
                  <Input
                    type="number"
                    placeholder="Введите объем"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    min="1"
                    className="h-12"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-3 text-gray-700">
                    Расстояние доставки
                  </label>
                  <Select value={distance} onValueChange={setDistance}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Выберите расстояние" />
                    </SelectTrigger>
                    <SelectContent>
                      {distances.map((dist) => (
                        <SelectItem key={dist.id} value={dist.id}>
                          <div className="flex justify-between w-full">
                            <span>{dist.name}</span>
                            <span className="text-blue-600 font-semibold ml-4">
                              +{dist.price.toLocaleString()} ₽
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={calculateCost}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12 text-lg font-semibold"
                size="lg"
              >
                Рассчитать стоимость
                <Calculator className="w-5 h-5 ml-2" />
              </Button>

              {totalCost > 0 && (
                <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-700 mb-2">
                      {totalCost.toLocaleString()} ₽
                    </div>
                    <p className="text-green-600 mb-4">
                      Общая стоимость с доставкой
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white/50 p-3 rounded-lg">
                        <div className="text-gray-600">Материалы:</div>
                        <div className="font-semibold">
                          {materialCost.toLocaleString()} ₽
                        </div>
                      </div>
                      <div className="bg-white/50 p-3 rounded-lg">
                        <div className="text-gray-600">Доставка:</div>
                        <div className="font-semibold">
                          {deliveryCost.toLocaleString()} ₽
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Почему выбирают нас?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Мы предоставляем комплексные решения для доставки сыпучих
              материалов
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <advantage.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {advantage.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Свяжитесь с нами</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Готовы обсудить ваш заказ? Мы работаем 24/7 и всегда готовы помочь
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Phone,
                title: "Телефон",
                value: "+7 (495) 123-45-67",
                desc: "Звоните круглосуточно",
              },
              {
                icon: Mail,
                title: "Email",
                value: "info@materials-msk.ru",
                desc: "Ответим в течение часа",
              },
              {
                icon: MapPin,
                title: "Адрес",
                value: "г. Москва, ул. Стройматериалов, 25",
                desc: "Офис и склад",
              },
            ].map((contact, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
              >
                <contact.icon className="w-8 h-8 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-xl font-semibold mb-2">{contact.title}</h3>
                <p className="text-yellow-400 font-semibold mb-2">
                  {contact.value}
                </p>
                <p className="text-gray-400 text-sm">{contact.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Готовы сделать заказ?</h3>
            <p className="text-blue-100 mb-6 text-lg">
              Оставьте заявку, и мы перезвоним в течение 5 минут для уточнения
              деталей
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8"
              >
                Оставить заявку
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-8"
              >
                Позвонить сейчас
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">
                СтройМатериалы
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Лидер в области доставки сыпучих материалов в Москве и области.
                Работаем с 2013 года, доставили более 15 000 тонн материалов.
              </p>
              <div className="flex gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="text-sm text-gray-400 ml-2">
                  4.9/5 на Яндекс.Картах
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Материалы</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Песок строительный</li>
                <li>Щебень всех фракций</li>
                <li>Чернозем плодородный</li>
                <li>Торф и грунт</li>
                <li>Бетон готовый</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Доставка 24/7</li>
                <li>Разгрузка техникой</li>
                <li>Консультации специалистов</li>
                <li>Оптовые поставки</li>
                <li>Самовывоз со склада</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 СтройМатериалы. Все права защищены.</p>
            <p className="text-sm mt-2">
              ИНН: 7777777777 | ОГРН: 1234567890123
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
