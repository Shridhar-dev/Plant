export const uploadImages = async (images: string[]) => {
    let links: string[] = [];
    const formData = new FormData();

    const uploadPromises = images.map((file) => {
        formData.append("file", file);
        formData.append("upload_preset", "e08kx5kr");

        return fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD}/upload`,
            {
                method: "POST",
                body: formData,
            }
        )
            .then((response) => response.text())
            .then((data: any) => {
                links.push(JSON.parse(data).secure_url);
            });
    });
    await Promise.all(uploadPromises);

    return links;
};
