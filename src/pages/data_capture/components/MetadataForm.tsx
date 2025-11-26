import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { useContext, useRef } from "react";
import { DataCaptureContext } from "../services/data_capture_service";

const formSchema = z.object({
  dob: z.coerce.date<Date>(),
  height: z.coerce.number<number>().min(0.1),
  weight: z.coerce.number<number>().min(0.1),
});

export default function MetadataForm() {
  const { data, setData } = useContext(DataCaptureContext);
  const fieldErrorsRef = useRef<{
    [key in keyof z.infer<typeof formSchema>]?: string[];
  }>({});

  const handleUpdate = (name: keyof z.infer<typeof formSchema>, value: any) => {
    const validationResult = formSchema.safeParse({ ...data, [name]: value });

    if (!validationResult.success) {
      const { fieldErrors } = z.flattenError(validationResult.error!);
      fieldErrorsRef.current = {
        ...fieldErrorsRef.current,
        [name]: fieldErrors[name],
      };
      setData({ ...data, [name]: value });
    } else {
      setData({ ...data, ...validationResult.data });
    }

    console.log(data);
  };

  return (
    <div className="space-y-8 w-full mx-auto py-4">
      <Field>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "pl-3 text-left font-normal",
                !data.dob && "text-muted-foreground"
              )}
            >
              {data.dob ? format(data.dob, "PPP") : <span>Pick a date</span>}

              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={data.dob}
              onSelect={(value) => handleUpdate("dob", value)}
            />
          </PopoverContent>
        </Popover>
        <FieldDescription>
          Please enter the date of birth of the child
        </FieldDescription>
        {fieldErrorsRef.current.dob && (
          <FieldError>{fieldErrorsRef.current.dob[0]}</FieldError>
        )}
      </Field>

      <Field>
        <FieldLabel>Height (cm)</FieldLabel>

        <Input
          placeholder="Child's height"
          type="number"
          name="height"
          value={data.height ?? undefined}
          onChange={(event) => handleUpdate("height", event.target.value)}
        />

        <FieldDescription>
          Please enter the height of the child in centimeters
        </FieldDescription>
        {fieldErrorsRef.current.height && (
          <FieldError>{fieldErrorsRef.current.height[0]}</FieldError>
        )}
      </Field>

      <Field>
        <FieldLabel>Weight (kg)</FieldLabel>

        <Input
          placeholder="Child's weight"
          type="number"
          name="weight"
          onChange={(event) => handleUpdate("weight", event.target.value)}
          value={data.weight ?? undefined}
        />

        <FieldDescription>
          Please enter the weight of the child in kilograms
        </FieldDescription>
        {fieldErrorsRef.current.weight && (
          <FieldError>{fieldErrorsRef.current.weight[0]}</FieldError>
        )}
      </Field>
    </div>
  );
}
