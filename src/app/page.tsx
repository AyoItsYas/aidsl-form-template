"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { toast } from "sonner";

import type { SubmitHandler } from "react-hook-form";

const formSchema = z.object({
	firstName: z.string().nonempty().min(2),
	lastName: z.string().nonempty().min(2),
	email: z.string().email(),
	youtubeVideoLink: z.string().url(),
});

export default function Home() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			youtubeVideoLink: "",
		},
	});

	const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
		fetch(
			"https://docs.google.com/forms/d/e/1FAIpQLSfXxqsl6VrERnIBX71OEmuWwZqsN1q1AD0qsTliJDPF5ZIkJA/formResponse",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},

				body: new URLSearchParams({
					"entry.1743492575": data.firstName,
					"entry.860330404": data.lastName,
					"entry.1992491264": data.email,
					"entry.346499562": data.youtubeVideoLink,
				}).toString(),
			},
		)
			.then((response) => {
				if (response.ok) {
					console.log("Form submitted successfully");
					toast.success("Form submitted successfully");
				} else {
					console.error("Form submission failed");
					toast.error("Form submission failed");
				}
			})
			.catch((error) => {
				console.error("Error submitting form:", error);
				toast.error("An error occurred while submitting the form");
			});
	};

	return (
		<section className="container">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 max-w-md mx-auto"
				>
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input placeholder="Yasiru" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input placeholder="Dharmathilaka" {...field} />
								</FormControl>
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
									<Input
										placeholder="yasiru.dharmathilaka@gmai.com"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="youtubeVideoLink"
						render={({ field }) => (
							<FormItem>
								<FormLabel>YouTube Video Link</FormLabel>
								<FormControl>
									<Input placeholder="https://www.youtube.com/..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</section>
	);
}
