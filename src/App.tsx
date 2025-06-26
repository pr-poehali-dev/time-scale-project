import { useState } from "react";
import {
  Calculator,
  Truck,
  Clock,
  Shield,
  Phone,
  Mail,
  MapPin,
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
  { id: "sand", name: "Песок строительный", price: 800, unit: "м³" },
  { id: "soil", name: "Чернозем", price: 1200, unit: "м³" },
  { id: "peat", name: "Торф", price: 900, unit: "м³" },
  { id: "gravel", name: "Щебень", price: 1100, unit: "м³" },
  { id: "clay", name: "Глина", price: 700, unit: "м³" },
  { id: "concrete", name: "Бетон М200", price: 3500, unit: "м³" },
];

const distances = [
  { id: "0-10", name: "До 10 км", multiplier: 1 },
  { id: "10-25", name: "10-25 км", multiplier: 1.5 },
  { id: "25-50", name: "25-50 км", multiplier: 2 },
  { id: "50+", name: "Свыше 50 км", multiplier: 3 },
];

export default function App() {
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [volume, setVolume] = useState("");
  const [distance, setDistance] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  const calculateCost = () => {
    if (!selectedMaterial || !volume || !distance) return;

    const material = materials.find((m) => m.id === selectedMaterial);
    const distanceData = distances.find((d) => d.id === distance);

    if (material && distanceData) {
      const materialCost = material.price * parseInt(volume);
      const deliveryCost = 500 * distanceData.multiplier;
      setTotalCost(materialCost + deliveryCost);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            Доставка сыпучих материалов
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Песок, чернозем, щебень, торф, глина и бетон с доставкой по городу и
            области
          </p>
          <div className="flex justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Доставка в день заказа</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Гарантия качества</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              <span>Собственный автопарк</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Наши материалы
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material) => (
              <Card
                key={material.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-lg">{material.name}</CardTitle>
                  <CardDescription>
                    от {material.price} ₽/{material.unit}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Высокое качество, соответствие ГОСТ, быстрая доставка
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Calculator className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Калькулятор стоимости
            </h2>
            <p className="text-gray-600">
              Рассчитайте стоимость материалов и доставки
            </p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Выберите материал
                </label>
                <Select
                  value={selectedMaterial}
                  onValueChange={setSelectedMaterial}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите материал" />
                  </SelectTrigger>
                  <SelectContent>
                    {materials.map((material) => (
                      <SelectItem key={material.id} value={material.id}>
                        {material.name} - {material.price} ₽/{material.unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Объем (м³)
                </label>
                <Input
                  type="number"
                  placeholder="Введите объем"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Расстояние доставки
                </label>
                <Select value={distance} onValueChange={setDistance}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите расстояние" />
                  </SelectTrigger>
                  <SelectContent>
                    {distances.map((dist) => (
                      <SelectItem key={dist.id} value={dist.id}>
                        {dist.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={calculateCost}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                Рассчитать стоимость
              </Button>

              {totalCost > 0 && (
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-lg font-semibold text-blue-800">
                    Общая стоимость: {totalCost.toLocaleString()} ₽
                  </p>
                  <p className="text-sm text-blue-600 mt-1">Включая доставку</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Свяжитесь с нами
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 mb-3 text-blue-600" />
              <h3 className="font-semibold mb-2">Телефон</h3>
              <p className="text-gray-600">+7 (900) 123-45-67</p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 mb-3 text-blue-600" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600">info@materials.ru</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 mb-3 text-blue-600" />
              <h3 className="font-semibold mb-2">Адрес</h3>
              <p className="text-gray-600">г. Москва, ул. Строительная, 15</p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-blue-800">
              Готовы сделать заказ?
            </h3>
            <p className="text-blue-700 mb-4">
              Звоните или отправляйте заявку — мы ответим в течение 5 минут
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Оставить заявку
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="mb-2">© 2024 Доставка сыпучих материалов</p>
          <p className="text-gray-400 text-sm">
            Качественные материалы с доставкой по городу и области
          </p>
        </div>
      </footer>
    </div>
  );
}
