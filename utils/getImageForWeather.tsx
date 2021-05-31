const images: { [index: string]: any} = {
	qing: { uri: "https://img-blog.csdnimg.cn/20210510163920771.png" },
	lei: { uri: "https://img-blog.csdnimg.cn/20210510164422844.png" },
	"Heavy Rain": { uri: "https://img-blog.csdnimg.cn/20210510165309488.png" },
	yun: { uri: "https://img-blog.csdnimg.cn/20210512101323264.png" },
	yu: { uri: "https://img-blog.csdnimg.cn/20210512102050588.png" },
	yin: { uri: "https://img-blog.csdnimg.cn/2021051211324459.png" },
	Showers: { uri: "https://img-blog.csdnimg.cn/2021051210151543.png" },
	Sleet: { uri: "https://img-blog.csdnimg.cn/20210512101702476.png" },
	xue: { uri: "https://img-blog.csdnimg.cn/20210512101913137.png" },
	wu: { uri: "https://img-blog.csdnimg.cn/20210525103621461.png" },
	bingbao: { uri: "https://img-blog.csdnimg.cn/20210525104129871.png" },
	shachen: { uri: "https://img-blog.csdnimg.cn/20210525111618274.png" },
  };
  
export default (weather: string) => images[weather];
 
