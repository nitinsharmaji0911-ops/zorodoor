import React from "react";

export default function SizeGuidePage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8 text-[--color-text-primary] text-center">
                Size Guide
            </h1>

            <div className="space-y-12">
                {/* Hoodies */}
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-[--color-text-primary]">Hoodies</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-[--color-text-secondary]">
                            <thead>
                                <tr className="border-b border-[--color-border]">
                                    <th className="py-2">Size</th>
                                    <th className="py-2">Chest (cm)</th>
                                    <th className="py-2">Length (cm)</th>
                                    <th className="py-2">Sleeve (cm)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[--color-border]">
                                <tr>
                                    <td className="py-2 font-medium">S</td>
                                    <td className="py-2">50</td>
                                    <td className="py-2">68</td>
                                    <td className="py-2">60</td>
                                </tr>
                                <tr>
                                    <td className="py-2 font-medium">M</td>
                                    <td className="py-2">53</td>
                                    <td className="py-2">70</td>
                                    <td className="py-2">61</td>
                                </tr>
                                <tr>
                                    <td className="py-2 font-medium">L</td>
                                    <td className="py-2">56</td>
                                    <td className="py-2">72</td>
                                    <td className="py-2">62</td>
                                </tr>
                                <tr>
                                    <td className="py-2 font-medium">XL</td>
                                    <td className="py-2">59</td>
                                    <td className="py-2">74</td>
                                    <td className="py-2">63</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* T-Shirts */}
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-[--color-text-primary]">T-Shirts</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-[--color-text-secondary]">
                            <thead>
                                <tr className="border-b border-[--color-border]">
                                    <th className="py-2">Size</th>
                                    <th className="py-2">Chest (cm)</th>
                                    <th className="py-2">Length (cm)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[--color-border]">
                                <tr>
                                    <td className="py-2 font-medium">S</td>
                                    <td className="py-2">48</td>
                                    <td className="py-2">69</td>
                                </tr>
                                <tr>
                                    <td className="py-2 font-medium">M</td>
                                    <td className="py-2">51</td>
                                    <td className="py-2">71</td>
                                </tr>
                                <tr>
                                    <td className="py-2 font-medium">L</td>
                                    <td className="py-2">54</td>
                                    <td className="py-2">73</td>
                                </tr>
                                <tr>
                                    <td className="py-2 font-medium">XL</td>
                                    <td className="py-2">57</td>
                                    <td className="py-2">75</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
