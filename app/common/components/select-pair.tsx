import { useState, type SelectHTMLAttributes } from "react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function SelectPair({
  label,
  description,
  name,
  required,
  placeholder,
  options,
}: {
  label: string;
  description: string;
  name: string;
  required: boolean;
  placeholder: string;
  options: { label: string; value: string }[];
} & SelectHTMLAttributes<HTMLSelectElement>) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-2 flex flex-col">
      <Label className="flex flex-col gap-1" onClick={() => setOpen(true)}>
        {label}
        <small className="text-muted-foreground">{description}</small>
      </Label>
      <Select
        name={name}
        required={required}
        open={open}
        onOpenChange={setOpen}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
