import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { DataCaptureContext } from "../services/data_capture_service";

const formSchema = z.object({
  dob: z.coerce.date<Date>(),
  height: z.coerce.number<number>().min(0.1),
  weight: z.coerce.number<number>().min(0.1),
});

export default function MetadataForm() {
  const { setData, data } = useContext(DataCaptureContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dob: new Date(),
      height: 0,
      weight: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        id="metadata-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full mx-auto py-4"
      >
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Child's Brithday</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={() =>
                      setData({ ...data, [field.name]: field.value })
                    }
                    // onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Please enter the date of birth of the child
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height (cm)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Child's height"
                  type="number"
                  {...field}
                  onChange={() =>
                    setData({ ...data, [field.name]: field.value })
                  }
                  onInput={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Please enter the height of the child in centimeters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight (kg)</FormLabel>
              <FormControl>
                <Input
                  placeholder="weight"
                  type="number"
                  {...field}
                  onChange={() =>
                    setData({ ...data, [field.name]: field.value })
                  }
                  onInput={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Please enter the exact weight of the child
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Button type="submit">Submit</Button> */}
      </form>
    </Form>
  );
}
