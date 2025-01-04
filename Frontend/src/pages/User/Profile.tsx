import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { currentPatient, updatePatient } from "../../features/auth/loginSlice";
import { AppDispatch } from "../../features/store";

interface Patient {
    id: number;
    name: string;
    phone: string;
    email: string;
}

const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const patient = useSelector(currentPatient) as Patient | null;
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: patient?.name || "",
        phone: patient?.phone || "",
        email: patient?.email || "",
    });

    useEffect(() => {
        if (patient) {
            setFormData({
                name: patient.name || "",
                phone: patient.phone || "",
                email: patient.email || "",
            });
            setIsLoading(false);
        }
    }, [patient]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!patient?.id) return;

        try {
            const result = await dispatch(
                updatePatient({
                    id: patient.id,
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                })
            ).unwrap();

            if (result.status === 200) {
                setIsEditing(false);
            }
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (!patient) return <div>No patient data found</div>;

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-200 to-blue-200 flex items-center justify-center p-6">
            <main className="w-full max-w-4xl">
                <div className="text-center mb-2">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Patient Dashboard
                    </h1>
                    <p className="text-gray-600 mt-2">
                        View and manage your medical profile
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
                        <div className="flex justify-between items-center">
                            <div className="text-white">
                                <p className="text-sm uppercase tracking-wider">
                                    Patient ID: #{patient.id}
                                </p>
                                <h2 className="text-2xl font-bold mt-1">
                                    {patient.name}
                                </h2>
                            </div>
                            <div className="bg-white/20 rounded-full p-2">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Personal Information
                            </h3>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="text-purple-600 hover:text-purple-700"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {isEditing ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        disabled={!isEditing}
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            !isEditing
                                                ? "bg-gray-50 text-gray-700"
                                                : "bg-white border-purple-500"
                                        }`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) =>
                                            setFormData({
                                                ...formData,
                                                phone: e.target.value,
                                            })
                                        }
                                        disabled={!isEditing}
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            !isEditing
                                                ? "bg-gray-50 text-gray-700"
                                                : "bg-white border-purple-500"
                                        }`}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    disabled
                                    className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-700 "
                                />
                            </div>

                            {isEditing && (
                                <div className="flex justify-end space-x-2 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </form>

                        <div className="mt-8 pt-6 border-t">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Recent Activity
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="w-32">Last Visit:</span>
                                    <span className="font-medium">
                                        June 15, 2023
                                    </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="w-32">
                                        Next Appointment:
                                    </span>
                                    <span className="font-medium">
                                        July 3, 2023
                                    </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="w-32">Blood Type:</span>
                                    <span className="font-medium">A+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
