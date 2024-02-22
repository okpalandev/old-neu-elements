
class BarChartWorklet {
    static get inputProperties() { return ['--chart-data', '--bar-color', '--bar-width', '--bar-height', '--bar-spacing']; }
    static get contextOptions() { return {alpha: true}; }

    paint(ctx, size, props) {
        const data = props.get('--chart-data').toString().split(',').map(Number);
        const barColor = props.get('--bar-color').toString();
        const barWidth = parseFloat(props.get('--bar-width').toString());
        const barHeight = parseFloat(props.get('--bar-height').toString());
        const barSpacing = parseFloat(props.get('--bar-spacing').toString());

        const maxBarHeight = size.height;
        const maxValue = Math.max(...data);
        
        const totalBarWidth = (barWidth + barSpacing) * data.length - barSpacing;
        const offset = (size.width - totalBarWidth) / 2;
    
        // Draw bars
        ctx.fillStyle = barColor;
        data.forEach((value, index) => {
            const barHeight = (value / maxValue) * maxBarHeight;
            const x = index * (barWidth + barSpacing);
            const y = size.height - barHeight;
            ctx.fillRect(x + offset, y, barWidth, barHeight);
        });
    }

}

registerPaint('bar-chart', BarChartWorklet);
