"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import getUserLocation from "@/api-manager/misc";
import getUserProfile from "@/api-manager/profile";
import {
  checkObjectValues,
  getValuesInLocalStorage,
  saveValuesInLocalStorage,
} from "@/lib/helper";

const profileFormSchema = z.object({
  display_name: z
    .string({
      required_error: "Please enter your full name.",
    })
    .min(2, {
      message: "Full name must be at least 2 characters.",
    }),
  username: z
    .string({
      required_error: "Please enter a username.",
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please enter a valid email.",
    })
    .email({
      message: "Please enter a valid email.",
    }),
  gender: z.string({
    required_error: "Please select a gender to display.",
  }),
  age: z.coerce
    .number({
      required_error: "Age is required.",
      invalid_type_error: "Age must be a number.",
    })
    .positive({
      message: "Age must be greater than 0.",
    }),
  location: z.string({
    required_error: "Please enter your location.",
  }),
  avatar_uri: z
    .string()
    .url({
      message: "Please enter a valid avatar url.",
    })
    .optional(),
  interest: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = getValuesInLocalStorage();

export function ProfileForm() {
  const [userLocation, setUserLocation] = useState<string>("");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "interest",
    control: form.control,
  });

  const onSubmit = (data: ProfileFormValues) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  // Fetch user location

  useEffect(() => {
    (async () => {
      const userCity = await getUserLocation();
      if (userCity) {
        setUserLocation(userCity.city);
      }
    })();
  }, []);

  // Fetching User details

  useEffect(() => {
    if (userLocation && !checkObjectValues(form.getValues()))
      (async () => {
        const userDetails = await getUserProfile();
        if (userDetails) {
          form.reset(userDetails.profile);
          if (!userDetails.profile.location) {
            form.setValue("location", userLocation);
          }
        }
      })();
  }, [userLocation]);

  // Prefilling User Location

  useEffect(() => {
    if (userLocation && !form.getValues().location) {
      form.setValue("location", userLocation);
    }
  }, [userLocation]);

  const saveValuesToLocal = () => {
    saveValuesInLocalStorage(form.getValues());
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onChange={saveValuesToLocal}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="display_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormDescription>
                This is your unique display name. It can be your real name or a
                pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gender to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="font-roboto">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input placeholder="Enter your age" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter your location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatar_uri"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter your avatar url" {...field} />
              </FormControl>
              <FormDescription>
                This would be you public image of profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`interest.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Interests
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add your interest and hobbies over here (optional).
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add Interest
          </Button>
        </div>
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
