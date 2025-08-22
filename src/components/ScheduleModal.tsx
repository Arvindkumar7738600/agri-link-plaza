import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock, Calendar } from "lucide-react";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleModal = ({ isOpen, onClose }: ScheduleModalProps) => {
  const schedule = [
    { day: "Monday", hours: "9:00 AM - 6:00 PM" },
    { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 6:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 6:00 PM" },
    { day: "Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 6:00 PM" },
    { day: "Sunday", hours: "Closed" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Business Hours</span>
          </DialogTitle>
          <DialogDescription>
            Our customer service and office operating hours
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          {schedule.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors">
              <span className="font-medium">{item.day}</span>
              <span className={`text-sm ${item.hours === 'Closed' ? 'text-muted-foreground' : 'text-primary'}`}>
                {item.hours}
              </span>
            </div>
          ))}
          <div className="mt-6 p-4 bg-muted/20 rounded-lg border">
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-medium">Emergency Support:</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              24/7 emergency assistance available for urgent equipment issues
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleModal;