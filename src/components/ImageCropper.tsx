import { useState, useCallback } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { createCroppedImage } from "../utils/imageUtils";

interface ImageCropperProps {
	isOpen: boolean;
	onClose: () => void;
	imageSrc: string | null;
	onCropComplete: (croppedImage: string) => void;
}

// Usando o tipo Area importado da biblioteca react-easy-crop

const ImageCropper = ({
	isOpen,
	onClose,
	imageSrc,
	onCropComplete,
}: ImageCropperProps) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

	const handleCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
		setCroppedAreaPixels(croppedAreaPixels);
	}, []);

	const handleCropConfirm = async () => {
		try {
			if (imageSrc && croppedAreaPixels) {
				const croppedImage = await createCroppedImage(
					imageSrc,
					croppedAreaPixels,
				);
				onCropComplete(croppedImage);
				onClose();
			}
		} catch (error) {
			console.error("Error cropping image:", error);
		}
	};

	const handleCancel = () => {
		setCrop({ x: 0, y: 0 });
		setZoom(1);
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="3xl">
			<ModalContent>
				<ModalHeader>
					<h3 className="text-xl font-semibold">Crop Image</h3>
				</ModalHeader>
				<ModalBody>
					<div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
						{imageSrc && (
							<Cropper
								image={imageSrc}
								crop={crop}
								zoom={zoom}
								aspect={1}
								onCropChange={setCrop}
								onZoomChange={setZoom}
								onCropComplete={handleCropComplete}
								objectFit="contain"
							/>
						)}
					</div>
					<div className="mt-4">
						<label
							htmlFor="zoom"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Zoom: {zoom.toFixed(1)}x
						</label>
						<input
							id="zoom"
							type="range"
							value={zoom}
							min={1}
							max={3}
							step={0.1}
							aria-labelledby="zoom"
							onChange={(e) => setZoom(Number(e.target.value))}
							className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button color="default" variant="light" onClick={handleCancel}>
						Cancel
					</Button>
					<Button color="primary" onPress={handleCropConfirm}>
						Apply
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default ImageCropper;
